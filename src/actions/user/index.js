import USUApi from '../../utils/api';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export function signUp(params = {}) {
  return dispatch => {
    USUApi.signUp(params)
      .then(resp => {
        dispatch(
          signUpSuccess({
            type: 'success',
            messages: [resp.data.status]
          })
        );
      })
      .catch(error => {
        dispatch(
          signUpFailure({
            type: 'warning',
            messages: error.response.data.errors
          })
        );
      })
  }
}

const signUpSuccess = payload => ({
  type: SIGN_UP_SUCCESS,
  payload
})

const signUpFailure = payload => ({
  type: SIGN_UP_FAILURE,
  payload
})