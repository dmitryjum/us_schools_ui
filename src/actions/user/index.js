import USUApi from '../../utils/api';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

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

export function logIn(params = {}) {
  return dispatch => {
    USUApi.logIn(params)
      .then(resp => {
        localStorage.setItem('auth_token', resp.data.auth_token)
        dispatch(
          logInSuccess({
            currentUser: {
              email: resp.data.email,
              auth_token: resp.data.auth_token
            },
            isAuthenticated: true,
            logInMessage: {
              type: 'success',
              messages: ["You're logged in successfuly."]
            }
          })
        );
      })
      .catch(error => logInFailureCallBack(error, dispatch))
  }
}

export function getCurrentUser() {
  const storedJWT = localStorage.getItem('auth_token')
  return dispatch => {
    if (storedJWT) {
      USUApi.isAuthenticated(storedJWT)
        .then(resp => {
          dispatch(
            logInSuccess({
              currentUser: {
                email: resp.data.email,
                auth_token: storedJWT
              },
              isAuthenticated: true
            })
          );
        })
        .catch(error => logInFailureCallBack(error, dispatch));
    }
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

const logInSuccess = payload => ({
  type: LOG_IN_SUCCESS,
  payload
})

const logInFailure = payload => ({
  type: LOG_IN_FAILURE,
  payload
})

function logInFailureCallBack(error, dispatch) {
  dispatch(
    logInFailure({
      currentUser: {},
      isAuthenticated: false,
      logInMessage: {
        type: "warning",
        messages: [error.response.data.error]
      }
    })
  )
}