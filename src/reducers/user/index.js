import { SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from "../../actions/user";

const initialState = {
  data: {
    signUpMessage: {}
  }
}

export default function signUp(state = initialState, action) {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      return {
        ...state, data: { signUpMessage: action.payload }
      };
    case SIGN_UP_FAILURE:
      return {
        ...state, data: {signUpMessage: action.payload }
      }
    default:
      return state;
  }
}