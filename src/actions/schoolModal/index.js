import USUApi from '../../utils/api';
import { requestSchools } from '../../actions/schoolList'
export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';

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

export function createSchool(params={}) {
  return dispatch => {
    USUApi.createSchool(params)
      .then(resp => {
        dispatch(openModal({resp}))
        dispatch(requestSchools())
      })
      .catch(error => console.log("school create Errors", error))
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