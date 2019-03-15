import { REQUEST_SCHOOLS } from "../../actions/schoolList";

const initialState = {
  data: []
}

export default function schools(state = initialState, action) {
  switch (action.type) {
    case REQUEST_SCHOOLS:
    return {
      ...state, data: action.payload.data.records
    };
    default:
      return state;
  }
}