import { REQUEST_SCHOOLS, ADD_SCHOOLS, SET_FILTER, SET_SEARCH, SEARCH_SUCCESS } from "../../actions/schoolList";

const initialState = {
  records: [],
  schoolPage: 1,
  per_page: 10,
  filter: {},
  search: {}
}

export default function schools(state = initialState, action) {
  switch (action.type) {
    case REQUEST_SCHOOLS:
      return {
        ...state, records: action.payload.data.records // deal with no pagination
      };
    case SET_SEARCH:
      return {
        ...initialState,
        search: action.payload.search
      };
    case SEARCH_SUCCESS:
      return {
        ...state, records: action.payload.data.records
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload.filter,
        schoolPage: 1
      }
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