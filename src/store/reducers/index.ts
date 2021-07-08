import { combineReducers } from "redux";
import { guessReducer } from "./guessReducer"

const Reducer = combineReducers({
    guess : guessReducer
})

export default Reducer;