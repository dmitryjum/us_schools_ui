import USUApi from '../../utils/api';
export const REQUEST_SCHOOLS = 'REQUEST_SCHOOLS';
export const SEARCH = 'SEARCH';
export const ADD_SCHOOLS = 'ADD_SCHOOLS';
export const SET_FILTER = 'SET_FILTER';

export async function requestSchools(params = {}) {
  return (dispatch, getState) => {
    params = {
      ...params,
      ...getState().schools.filter,
      'page': getState().schools.schoolPage,
      'per_page': getState().schools.per_page
    };
    USUApi.getSchools(params)
      .then(resp => {
        dispatch(requestSchoolsThunk(resp))
      })
      .catch(error => schoolFetchError(error))
  }
}

export async function search(params = {'term': ''}) {
  const payload = await USUApi.search(params)
  return {
    type: SEARCH,
    payload
  }
}

export async function findByKey(params = {}) {
  return (dispatch) => {
    dispatch(setFilterThunk({filter: params}));
    dispatch(requestSchools())
  }
}

export function addMoreSchools(params={}) {
  return (dispatch, getState) => {
    params = {
      ...getState().schools.filter,
      'page': getState().schools.schoolPage + 1,
      'per_page': getState().schools.per_page
    };
    USUApi.getSchools(params)
      .then(resp => {
        dispatch(
          addSchools({...resp, schoolPage: params.page })
        )
      })
      .catch(error => schoolFetchError(error))
  }
}

const addSchools = payload => ({
  type: ADD_SCHOOLS,
  payload
});

const requestSchoolsThunk = payload => ({
  type: REQUEST_SCHOOLS,
  payload
});

const setFilterThunk = payload => ({
  type: SET_FILTER,
  payload
})

function schoolFetchError(error) {
  console.log("errors fetchin schools: ", error)
}