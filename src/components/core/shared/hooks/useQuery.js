import {useEffect, useReducer, useState} from "react";
import ACTIONS from "./dataActions";
import dataReducer from "./dataReducer";
import PropTypes from 'prop-types'
import axios from "axios";

const init = (e) => {
    return e
}
export default function useQuery(props) {
    const [data, dispatchData] = useReducer(dataReducer, [], init)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [filters, setFilters] = useState([])
    const [sorts, setSorts] = useState([])
    const [hasMore, setHasMore] = useState(false)

    const fetchParams = () => {
        let pack = {page: currentPage, quantity: props.fetchSize, filters: JSON.stringify(filters), sorts: JSON.stringify(sorts)}
        if (typeof props.parsePackage === 'function')
            pack = props.parsePackage(pack)
        return {
            method: 'GET',
            headers: {...props.headers, 'content-type': 'application/json'}, url: props.url,
            params: pack,
        }
    }


    useEffect(() => {
        setLoading(true)
        const params = fetchParams()
        console.log('PARAMS', params.params)
        axios(
            params
        ).then(res => {
            dispatchData({type: ACTIONS.PUSH, payload: res.data})
            setHasMore(res.data.length > 0)
            setLoading(false)
        }).catch(() => null)
    }, [filters, sorts, currentPage])

    const clean = () => {
        dispatchData({type: ACTIONS.EMPTY})
        setHasMore(false)
        setCurrentPage(0)
    }

    return {
        data,
        filters,
        setFilters,
        sorts, setSorts,
        setCurrentPage,
        currentPage,
        hasMore,
        loading,
        clean
    }
}
useQuery.propTypes = {
    url: PropTypes.string.isRequired,
    headers: PropTypes.object,
    parsePackage: PropTypes.func,
    fetchSize: PropTypes.number
}
