import {combineReducers} from "redux";
import cartReducer from "./cartReducer";
import currentUserReducer from "./currentUserReducer";

export default combineReducers({
	cartReducer,
	currentUserReducer
});