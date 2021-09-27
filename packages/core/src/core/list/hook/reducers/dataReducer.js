import ACTIONS from "../actions/dataActions";
import {v4 as uuid4} from "uuid";
import React from 'react'

export default function dataReducer(currentState, action) {
    switch (action.type) {
        case ACTIONS.EMPTY: {
            return []
        }
        case ACTIONS.PUSH: {
            let data  = [...currentState].map(e => e.data)
            console.log('DATA', data, 'payload', action.payload)
            let value = [...new Set([...data, ...action.payload])]

            value = value.map(e => {return {id: uuid4().toString(), data: e}})

            return value
        }
        case ACTIONS.UPDATE_CELL: {
            return [...currentState][action.payload.index][action.payload.key] = action.payload.value
        }
        default:
            return currentState
    }
}
