import USUApi from '../../utils/api';
export const REQUEST_SCHOOLS = 'REQUEST_SCHOOLS'

export async function requestSchools(params = {}) {
  const payload = await USUApi.getSchools(params)
  return {
    type: REQUEST_SCHOOLS,
    payload
  }
}