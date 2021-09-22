import filtersActions from "../actions/dataManagementActions";

export default function dataManagementReducer(currentState, action) {
    switch (action.type) {
        case filtersActions.REMOVE: {
            const index = currentState.findIndex(e => e.key === action.payload.key)
            return [...currentState].splice(index, 1)
        }
        case filtersActions.PUSH: {
            return [...currentState].push(action.payload)
        }
        case filtersActions.UPDATE: {
            const index = currentState.findIndex(e => e.key === action.payload.key)
            return currentState[index][action.payload.key] = action.payload.value
        }
        default:
            return currentState
    }
}