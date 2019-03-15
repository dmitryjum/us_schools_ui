import USUApi from '../../utils/api';
export const REQUEST_SCHOOLS = 'REQUEST_SCHOOLS'

export async function requestSchools(params = {'page': 1, 'per_page': 10}) {
  const payload = await USUApi.getSchools(params)
  return {
    type: REQUEST_SCHOOLS,
    payload
  }
}