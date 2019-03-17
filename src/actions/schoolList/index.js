import USUApi from '../../utils/api';
export const REQUEST_SCHOOLS = 'REQUEST_SCHOOLS';
export const SEARCH = 'SEARCH';

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