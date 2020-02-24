import { combineReducers } from "redux";
import SchoolListReducer from './schoolList'
import UserReducer from './user'

const rootReducer = combineReducers({
  schools: SchoolListReducer,
  user: UserReducer
})
export default rootReducer;