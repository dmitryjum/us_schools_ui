import {
  MODAL_OPEN,
  MODAL_CLOSE
} from "../../actions/schoolModal"

const initialState = {
  show: false,
  school: {
    title: '',
    details: {}
  }
}

export default function schoolModal(state = initialState, action) {
  switch (action.type) {
    case MODAL_OPEN:
      return { ...state, ...action.payload };
    case MODAL_CLOSE:
      return { ...state, ...initialState };
    default:
      return state;
  }
}