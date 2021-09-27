import {useEffect, useMemo, useReducer, useState} from "react";
import ACTIONS from "../../list/new/hook/actions/dataActions";
import dataReducer from "../../list/new/hook/reducers/dataReducer";
import PropTypes from 'prop-types'
import axios from "axios";

const init = (e) => {
    return e
}
export default function useQuery(props) {
    const [data, dispatchData] = useReducer(dataReducer, [], init)
    const [loading, setLoading] = useState(false)
    const maxID = useMemo(() => {
        return data.length > 0 ? data[data.length - 1].data[props.identificationKey] : null
    }, [data])

    const [filters, setFilters] = useState([])
    const [sorts, setSorts] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const fetchParams = useMemo(() => {
        let pack = {max_id: maxID, quantity: props.fetchSize, filters: JSON.stringify(filters), sorts: sorts}
        if (typeof props.parsePackage === 'function')
            pack = props.parsePackage(pack)
        return {
            method: 'GET',
            headers: {...props.headers, 'content-type': 'application/json'}, url: props.url,
            params: pack,
        }
    }, [data, maxID, props.fetchSize])
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        setLoading(true)
        axios(
            fetchParams
        ).then(res => {
            if (maxID === null) {
                dispatchData({type: ACTIONS.EMPTY})
                dispatchData({type: ACTIONS.PUSH, payload: res.data})
            } else
                dispatchData({type: ACTIONS.PUSH, payload: res.data})
            setHasMore(res.data.length > 0)
            setLoading(false)
        }).catch(() => null)
    }, [filters, sorts, currentPage])

    const clean = () => {
        dispatchData({type: ACTIONS.EMPTY})
        setHasMore(false)
        setCurrentPage(1)
    }

    return {
        data,
        filters,
        setFilters,
        sorts,
        setSorts,
        setCurrentPage,
        currentPage,
        hasMore,
        loading,
        clean
    }
}
useQuery.propTypes={
    url: PropTypes.string.isRequired,
    headers: PropTypes.object,
    parsePackage: PropTypes.func,
    fetchSize: PropTypes.number,
    identificationKey: PropTypes.string.isRequired,
}