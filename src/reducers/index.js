import { combineReducers } from "redux";
import SchoolListReducer from './schoolList'

const rootReducer = combineReducers({
  schools: SchoolListReducer
})
export default rootReducer;
// export default (state, action) => {
//   return rootReducer(state, action);
// };