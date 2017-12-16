export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';


export function loginRequest() {
  console.log('Log_REQ');
  return {
    type: LOGIN_REQUEST,
  };
}

export function loginSuccess(profile) {
  return {
    type: LOGIN_SUCCESS,
    profile,
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}