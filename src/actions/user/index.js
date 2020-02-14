import USUApi from '../../utils/api';
export const SIGN_UP = 'SIGN_UP';

export async function signUp(params = {}) {
  const payload = await USUApi.signUp(params)
  return {
    type: SIGN_UP,
    payload
  }
}