import {useEffect, useMemo, useRef, useState} from "react";
import Fetch from "../methods/Fetch";

export default function useData(props) {
    const [data, setData] = useState([])
    const [maxID, setMaxID] = useState(null)
    const [searchInput, setSearchInput] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [mounted, setMounted] = useState(false)
    const [mountingPoint, setMountingPoint] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [maxHeight, setMaxHeight] = useState(undefined)
    const ref = useRef()
    const [selected, setSelected] = useState([])
    const [sorts, setSorts] = useState([])
    const [fetchSize, setFetchSize] = useState(props.fetchSize !== undefined ? props.fetchSize : 15)
    const size = useMemo(() => {
        let l = 0
        for (let i = 0; i < data.length; i++)
            l = l + data[i].length
        return l
    }, [data])
    const [hasMore, setHasMore] = useState(undefined)

    const refresh = () => {
        setSelected([])
        setLoading(true)
        setData([])
        setMaxID(null)

        if (typeof setRefreshed === 'function')
            setRefreshed(true)

        Fetch({
            setHasMore: setHasMore,
            fetchSize: fetchSize,
            setData: setData,
            data: [],
            maxID: null,
            searchInput: null,
            setMaxID: setMaxID,
            fetchToken: props.fetchToken,
            fetchUrl: props.fetchUrl,
            params: props.fetchParams,
            searchFieldName: props.searchFieldName
        }).then(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        if (!mounted) {
            let newSorts = []
            props.fields.forEach(e => {
                newSorts.push({
                    field: e.name,
                    type: undefined,
                    variant: e.type,
                    subfield: e.subfield
                })
            })

            setSorts(newSorts)

            if (!props.asModal) {
                setMaxHeight(document.documentElement.offsetHeight - ref.current.getBoundingClientRect().y - 16)
            } else {

                setMaxHeight(ref.current?.parentNode.getBoundingClientRect().height - ref.current?.offsetTop)
            }


            const newElement = document.createElement('div')
            if (mountingPoint === undefined) {
                setMountingPoint(newElement)
                document.body.appendChild(newElement)
            }
            setMounted(true)
        }

        if (Array.isArray(data) && (props.triggerRefresh || data.length === 0))
            refresh()
    }, [props.triggerRefresh])

    return {
        data, setData,
        maxID, setMaxID,
        searchInput, setSearchInput,
        currentPage, setCurrentPage,
        mountingPoint,
        loading,
        maxHeight,
        ref, refresh,
        selected, setSelected,
        sorts, setSorts,
        fetchSize,
        size,
        hasMore, setHasMore
    }
}