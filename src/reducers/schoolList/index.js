import { REQUEST_SCHOOLS, SEARCH } from "../../actions/schoolList";

const initialState = {
  data: {
    records: []
  }
}

export default function schools(state = initialState, action) {
  switch (action.type) {
    case REQUEST_SCHOOLS:
    return {
      ...state, data: action.payload.data // deal with no pagination
    };
    case SEARCH:
    return {
      ...state, data: action.payload.data
    }
    default:
      return state;
  }
}