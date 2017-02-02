import AuthService from '../utils/AuthService'

export function loginUser() {
  return function (dispatch) {
    dispatch({ type: "LOGIN_REQUEST" });

    const auth = new AuthService(_CLIENT_ID, _DOMAIN);

    auth.login();
    
    dispatch({ type: "LOGIN_SUCCESS", payload: "TEST"});  
  }
}

export function logoutUser() {
  return function (dispatch) {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    dispatch({ type: "LOGOUT_SUCCESS" });
  }
}
