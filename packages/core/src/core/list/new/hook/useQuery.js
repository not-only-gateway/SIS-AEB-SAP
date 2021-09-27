import {useEffect, useMemo, useReducer, useState} from "react";
import ACTIONS from "./actions/dataActions";
import dataReducer from "./reducers/dataReducer";

import axios from "axios";

const init = (e) => {
    return e
}
export default function useQuery(identificationKey, url, headers, parsePackage) {
    const [data, dispatchData] = useReducer(dataReducer, [], init)
    const [loading, setLoading] = useState(false)
    const maxID = useMemo(() => {
        return data.length > 0 ? data[data.length - 1].data[identificationKey] : null
    }, [data])

    const [filters, setFilters] = useState([])
    const [sorts, setSorts] = useState([])
    const [fetchSize, setFetchSize] = useState(15)
    const [hasMore, setHasMore] = useState(false)
    const fetchParams = useMemo(() => {
        let pack = {max_id: maxID, quantity: fetchSize, filters: JSON.stringify(filters), sorts: sorts}
        console.log(pack)
        if (typeof parsePackage === 'function')
            pack = parsePackage(pack)
        return {
            method: 'GET',
            headers: {...headers, 'content-type': 'application/json'}, url: url,
            params: pack,
        }
    }, [data, maxID, fetchSize])
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        setLoading(true)
        axios(
            fetchParams
        ).then(res => {
            console.log(res)
            if (maxID === null) {
                dispatchData({type: ACTIONS.EMPTY})
                dispatchData({type: ACTIONS.PUSH, payload: res.data})
            } else
                dispatchData({type: ACTIONS.PUSH, payload: res.data})
            setHasMore(res.data.length > 0)
            setLoading(false)
        }).catch(e => null)
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
        fetchSize,
        setFetchSize,
        setCurrentPage,
        currentPage,
        hasMore,
        loading,
        clean
    }

}