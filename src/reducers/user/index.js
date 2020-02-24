import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE
} from "../../actions/user";

const initialState = {
  data: {
    signUpMessage: {},
    logInMessage: {},
    currentUser: {},
    isAuthenticated: false
  }
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      return {
        ...state, data: { signUpMessage: action.payload }
      };
    case SIGN_UP_FAILURE:
      return {
        ...state, data: {signUpMessage: action.payload }
      };
    case LOG_IN_SUCCESS:
      return {
        ...state, data: action.payload
      };
    case LOG_IN_FAILURE:
      return {
        ...state, data: action.payload
      }
    default:
      return state;
  }
}