import { REQUEST_SCHOOLS, SEARCH, ADD_SCHOOLS } from "../../actions/schoolList";

const initialState = {
  records: [],
  schoolPage: 1
}

export default function schools(state = initialState, action) {
  switch (action.type) {
    case REQUEST_SCHOOLS:
    return {
      ...state, records: action.payload.data.records // deal with no pagination
    };
    case SEARCH:
    return {
      ...state, records: action.payload.data.records
    };
    case ADD_SCHOOLS:
      return {
        ...state,
        schoolPage: action.payload.schoolPage,
        records: state.records.concat(action.payload.data.records)
      }
    default:
      return state;
  }
}