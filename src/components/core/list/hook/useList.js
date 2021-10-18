import {useEffect, useReducer, useRef, useState} from "react";

const actions = {
    UPDATE_SIZE: 0,
    UPDATE_VISIBILITY: 1,
    UPDATE_ORDER: 2
}
const reducer = (state, action) => {
    switch (action.type) {
        case actions.UPDATE_ORDER: {
            return state
        }
        case actions.UPDATE_SIZE: {
            let newValue = [...state]
            const i = newValue.findIndex(e => e.key === action.payload.key)
            newValue[i].additionalWidth = action.payload.size

            return newValue
        }
        case actions.UPDATE_VISIBILITY: {
            let newValue = [...state]
            const i = newValue.findIndex(e => e.key === action.payload.key)
            newValue[i].visible = !newValue[i].visible
            console.log('HERE')
            return newValue
        }
        default:
            return state
    }
}

export default function useList(initialKeys, noAutoHeight=undefined) {


    const wrapperRef = useRef()
    const [maxHeight, setMaxHeight] = useState()
    const [keys, keysDispatcher] = useReducer(reducer, initialKeys, (val) => val)
    const [openSettings, setOpenSettings] = useState(false)

    useEffect(() => {
        if (!noAutoHeight)
            setMaxHeight((document.documentElement.offsetHeight - wrapperRef.current.getBoundingClientRect().top - 16) + 'px')
    }, [])

    return {maxHeight, keys, keysDispatcher, actions, openSettings, setOpenSettings, wrapperRef}
}