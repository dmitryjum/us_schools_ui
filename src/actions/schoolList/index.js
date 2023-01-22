import USUApi from '../../utils/api';
export const REQUEST_SCHOOLS = 'REQUEST_SCHOOLS';
export const SEARCH = 'SEARCH';
export const ADD_SCHOOLS = 'ADD_SCHOOLS';
export const SET_FILTER = 'SET_FILTER';
export const SET_SEARCH = 'SET_SEARCH';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const REQUEST_SCHOOLS_ERROR = 'REQUEST_SCHOOLS_ERROR';

export function requestSchools(params = {}) {
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
      .catch(error => {
        dispatch(schoolFetchErrorThunk(error.toString()))
      })
  }
}

export function search(params = {'term': ''}) {
  console.log("in test: " + params)
  return (dispatch, getState) => {
    dispatch(setSearchThunk({search: params}))
    params = {
      ...params,
      'page': getState().schools.schoolPage,
      'per_page': getState().schools.per_page
    }
    USUApi.search(params)
      .then(resp => {
        dispatch(searchSuccessThunk(resp))
      })
      .catch(error => {
        dispatch(schoolFetchErrorThunk(error.toString()))
      })
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
      ...getState().schools.search,
      ...getState().schools.filter,
      'page': getState().schools.schoolPage + 1,
      'per_page': getState().schools.per_page
    };
    const fetchSchools = params['term'] === undefined ?
     USUApi.getSchools(params) : USUApi.search(params)
    fetchSchools.then(resp => {
      dispatch(
        addSchools({...resp, schoolPage: params.page })
      )
    }).catch(error => {
        dispatch(schoolFetchErrorThunk(error.toString()))
      })
  }
}

const searchSuccessThunk = payload => ({
  type: SEARCH_SUCCESS,
  payload
});

const setSearchThunk = payload => ({
  type: SET_SEARCH,
  payload
})

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
});

const schoolFetchErrorThunk = payload => ({
  type: REQUEST_SCHOOLS_ERROR,
  payload
});