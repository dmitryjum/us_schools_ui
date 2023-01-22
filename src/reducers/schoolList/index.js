import { REQUEST_SCHOOLS, ADD_SCHOOLS, SET_FILTER, SET_SEARCH, SEARCH_SUCCESS, REQUEST_SCHOOLS_ERROR } from "../../actions/schoolList";

const initialState = {
  records: [],
  schoolPage: 1,
  per_page: 10,
  filter: {},
  search: {},
  totalPages: null,
  error: null
}

export default function schools(state = initialState, action) {
  switch (action.type) {
    case REQUEST_SCHOOLS:
      return {
        ...state,
        totalPages: action.payload.data.pages_per_limit,
        records: action.payload.data.records // deal with no pagination
      };
    case SET_SEARCH:
      return {
        ...initialState,
        search: action.payload.search
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        totalPages: action.payload.data.pages_per_limit,
        records: action.payload.data.records
      };
    case SET_FILTER:
      return {
        ...initialState,
        filter: action.payload.filter,
      }
    case ADD_SCHOOLS:
      return {
        ...state,
        schoolPage: action.payload.schoolPage,
        totalPages: action.payload.data.pages_per_limit,
        records: state.records.concat(action.payload.data.records)
      }
    case REQUEST_SCHOOLS_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}