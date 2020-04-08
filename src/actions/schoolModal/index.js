import USUApi from '../../utils/api';
import { requestSchools } from '../../actions/schoolList'
export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';
export const SET_OLD_DETAILS_KEY = 'SET_OLD_DETAILS_KEY';

export function openModal(params={}) {
  const payload = {...params, show: true}
  return {
    type: MODAL_OPEN,
    payload
  }
}

export function closeModal() {
  return {
    type: MODAL_CLOSE
  }
}

export function setOldDetailsKey(value = '') {
  const payload = { oldDetailsKey: value}
  return {
    type: SET_OLD_DETAILS_KEY,
    payload
  }
}

export function updateSchool(params={}) {
  return (dispatch) => {
    USUApi.updateSchool(params)
     .then(resp => {
        dispatch(openModal({resp}))
        dispatch(requestSchools())
     })
      .catch(error => console.log("school update Errors", error))
  }
}