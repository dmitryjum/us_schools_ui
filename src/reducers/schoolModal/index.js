import {
  MODAL_OPEN,
  MODAL_CLOSE
} from "../../actions/schoolModal"

const initialState = {
  show: false
}

export default function schoolModal(state = initialState, action) {
  switch (action.type) {
    case MODAL_OPEN:
      return {
        ...state, ...action.payload
      };
    case MODAL_CLOSE:
      return {
        ...state, ...action.payload
      };
    default:
      return state;
  }
}