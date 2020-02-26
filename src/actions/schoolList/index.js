import USUApi from '../../utils/api';
export const REQUEST_SCHOOLS = 'REQUEST_SCHOOLS';
export const SEARCH = 'SEARCH';
export const ADD_SCHOOLS = 'ADD_SCHOOLS';

export async function requestSchools(params = {}) {
  const payload = await USUApi.getSchools(params)
  return {
    type: REQUEST_SCHOOLS,
    payload
  }
}

export async function search(params = {'term': ''}) {
  const payload = await USUApi.search(params)
  return {
    type: SEARCH,
    payload
  }
}

export async function addMoreSchools(params={}) {
  return dispatch => {
    USUApi.getSchools(params)
      .then(resp => {
        dispatch(
          addSchools({...resp, schoolPage: params.page })
        )
      })
      .catch(error => {
        console.log("errors fetchin schools: ", error)
      })
  }
}

const addSchools = payload => ({
  type: ADD_SCHOOLS,
  payload
});