import {
  MODAL_OPEN,
  MODAL_CLOSE
} from "../../actions/schoolModal"
// school initial state should be
// school: {
  // title: '',
  // details: {}
// }

const initialState = {
  show: false,
  school: {}
}

export default function schoolModal(state = initialState, action) {
  switch (action.type) {
    case MODAL_OPEN:
      return {
        ...state, ...action.payload
      };
    case MODAL_CLOSE:
      return {
        ...state, show: false, school: {}
      };
    default:
      return state;
  }
}