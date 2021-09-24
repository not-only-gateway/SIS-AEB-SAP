import {useCallback, useEffect, useMemo, useReducer, useRef, useState} from "react";
import observer from "./deps/observer";

const ACTIONS = {
    RESIZE: 'resize',

    INIT: 'init',

}

function tableReducer(currentState, action) {
    switch (action.type) {
        case ACTIONS.INIT: {
            return action.payload
        }
        case ACTIONS.RESIZE: {
            const value = [...currentState]
            if (value[action.payload.index] !== undefined)
                value[action.payload.index].width = action.payload.width
            console.log(value, action, currentState)
            return value
        }
        default:
            return currentState
    }
}

export default function useTable(keys, reference, setCurrentPage, currentPage, loading, hasMore) {
    const [columns, dispatchColumns] = useReducer(tableReducer, [])
    const observer = useRef()
    const lastElementRef = useCallback(node => {
            if (loading) return
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && hasMore) {
                    setCurrentPage(currentPage + 1)
                }
            })
            if (node) observer.current.observe(node)
        }, [loading, hasMore])

    useEffect(() => {
        let values = []
        keys.forEach(e => {
            values.push({
                ...e,
                width: '100%'
            })
        })

        dispatchColumns({type: ACTIONS.INIT, payload: values})
    }, [keys])

    return {columns, dispatchColumns, actions: ACTIONS, lastElementRef}
}