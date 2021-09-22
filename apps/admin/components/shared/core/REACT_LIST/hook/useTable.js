import {useEffect, useMemo, useReducer, useRef, useState} from "react";

const ACTIONS = {
    RESIZE: 'resize',
    HIDE: 'hide',
    INIT: 'init',
    SHOW: 'show'
}

function tableReducer(currentState, action) {
    console.log('WIDTH',  action.payload.width)
    switch (action.type) {
        case ACTIONS.INIT: {
            return action.payload
        }
        case ACTIONS.RESIZE: {
            const value = [...currentState]
            if (value[action.payload.index] !== undefined)
                value[action.payload.index].width = action.payload.width

            return value
        }
        case ACTIONS.HIDE: {
            return [...currentState][action.payload.index].hidden = true
        }
        case ACTIONS.SHOW: {
            return [...currentState][action.payload.index].hidden = false
        }
        default:
            return currentState
    }
}

export default function useTable(keys) {
    const [columns, dispatchColumns] = useReducer(tableReducer, [])
    const ref = useRef()
    useEffect(() => {
        let values = []
        keys.forEach(e => {
            values.push({
                ...e,
                width: 'auto',
                hidden: false
            })
        })

        dispatchColumns({type: ACTIONS.INIT, payload: values})
    }, [keys])

    return {columns, dispatchColumns, actions: ACTIONS, ref}
}