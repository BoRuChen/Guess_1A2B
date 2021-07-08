import { ActionTypes } from "../actionTypes"

const initState: string[] = [];

export const guessReducer = (state = initState, action: any) => {
    switch (action.type) {
        case ActionTypes.ADD_NUM:
            return [...state, action.payload]
        case ActionTypes.CLEAR_NUM:
            return initState
        default:
            return state;
    }
}