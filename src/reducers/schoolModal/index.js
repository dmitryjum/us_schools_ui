import {
  MODAL_OPEN,
  MODAL_CLOSE,
  SET_OLD_DETAILS_KEY
} from "../../actions/schoolModal"

const initialState = {
  show: false,
  school: {
    title: '',
    details: {}
  },
  oldDetailsKey: ''
}

export default function schoolModal(state = initialState, action) {
  switch (action.type) {
    case MODAL_OPEN:
      debugger
      return { ...state, ...action.payload };
    case MODAL_CLOSE:
      return { ...state, ...initialState };
    case SET_OLD_DETAILS_KEY:
      return { ...state, ...action.payload}
    default:
      return state;
  }
}