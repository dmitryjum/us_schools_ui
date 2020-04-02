import { combineReducers } from "redux";
import SchoolListReducer from './schoolList';
import UserReducer from './user';
import SchoolModalReducer from './schoolModal';

const rootReducer = combineReducers({
  schools: SchoolListReducer,
  user: UserReducer,
  schoolModal: SchoolModalReducer
})
export default rootReducer;