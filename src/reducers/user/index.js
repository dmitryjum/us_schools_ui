import { SIGN_UP } from "../../actions/user";

const initialState = {
  data: {
    signUpMessage: ""
  }
}

export default function signUp(state = initialState, action) {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state, data: action.payload.data
      };
    default:
      return state;
  }
}