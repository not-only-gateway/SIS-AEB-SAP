import ACTIONS from "../actions/dataActions";
import {v4 as uuid4} from "uuid";


export default function dataReducer (currentState, action){
    switch (action.type){
        case ACTIONS.EMPTY:{
            return []
        }
        case ACTIONS.PUSH:{
            let value = [...action.payload]
            value.forEach(e => {
                return {
                    id: uuid4().toString(),
                    data: e
                }
            })
            return [...currentState, ...value]
        }
        case ACTIONS.UPDATE_CELL:{
            return [...currentState][action.payload.index][action.payload.key] = action.payload.value
        }
        default:
            return currentState
    }
}
