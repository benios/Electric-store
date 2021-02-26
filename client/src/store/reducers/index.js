import {combineReducers} from 'redux';
import category from './category'
import cartReducer from './cartReducer'
import currentUserReducer from './currentUserReducer'

export default combineReducers({
  category,
  cartReducer,
  currentUserReducer
});