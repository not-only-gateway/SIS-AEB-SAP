import ACTIONS from "./dataActions";
import {v4 as uuid4} from "uuid";

export default function dataReducer(currentState, action) {
    switch (action.type) {
        case ACTIONS.EMPTY: {
            return []
        }
        case ACTIONS.PUSH: {
            if(Array.isArray(action.payload)) {
                let data = [...currentState].map(e => e.data)
                let value = [...new Set([...data, ...action.payload])]

                value = value.map(e => {
                    return {id: uuid4().toString(), data: e}
                })

                return value
            }
            else return currentState
        }
        default:
            return currentState
    }
}
