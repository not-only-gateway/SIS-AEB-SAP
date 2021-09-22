import PropTypes from 'prop-types'
import React, {useState, useMemo, useCallback, useReducer, useEffect, useRef} from 'react'
import dataReducer from "./reducers/dataReducer";
import ACTIONS from "./actions/dataActions";
import fetch from "./deps/fetch";
import dataManagementReducer from "./reducers/dataManagementReducer";

const init = (e) => {
    return e
}
export default function useList(props) {
    const [data, dispatchData] = useReducer(dataReducer, [], init)
    const [filters, dispatchFilters] = useReducer(dataManagementReducer, [], init)
    const [sorts, dispatchSorts] = useReducer(dataManagementReducer, [], init)
    const [fetchSize, setFetchSize] = useState(props.fetchSize)
    const maxID = useMemo(() => {
        return data.length > 0 ? data[data.length - 1][props.identificationKey] : null
    }, [data])
    const [hasMore, setHasMore] = useState(false)
    const listRef = useRef()


    const fetchParams = useMemo(() => {
        return {
            data: data, dispatchData: dispatchData,
            actions: ACTIONS, setHasMore: setHasMore,
            maxID: maxID, quantity: fetchSize,
            headers: props.headers, url: props.url
        }
    }, [data, maxID, fetchSize])

    const refresh = () => {
        fetch({...fetchParams, maxID: null})
    }

    useEffect(() => {
        if (props.initialData && Array.isArray(props.initialData))
            dispatchData({type: ACTIONS.PUSH, payload: props.initialData})
        else
            refresh()
    }, [])

    return {refresh, fetchSize, setFetchSize, data, dispatchData, maxID, keys: props.keys, hasMore, setHasMore, listRef, controlButtons: props.controlButtons}
}
useList.propTypes = {
    url: PropTypes.string.isRequired,
    headers: PropTypes.object,
    parsePackage: PropTypes.func,
    fetchSize: PropTypes.number,
    initialData: PropTypes.array,

    identificationKey: PropTypes.string.isRequired,

    keys: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,

    })).isRequired,
    controlButtons: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.element,
        label: PropTypes.any,
        onClick: PropTypes.func
    }))
}