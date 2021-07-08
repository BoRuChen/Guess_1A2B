import { ActionTypes } from "../actionTypes"
import { Dispatch } from "redux"

export const addNum = (Num:string) => {
    return(dispatch : Dispatch) => {
        dispatch({
            type:ActionTypes.ADD_NUM,
            payload: Num
        })
    }
}

export const clearNum = () => {
    return(dispatch : Dispatch) => {
        dispatch({
            type:ActionTypes.CLEAR_NUM,
        })
    }
}
