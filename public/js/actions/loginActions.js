import axios from "axios";
var querystring = require('querystring');

export function loginUser(user) {
  return function(dispatch) {
    dispatch({type: "LOGIN_REQUEST"});
    axios.post("http://127.0.0.1:8080/api/authenticate",
    querystring.stringify({
      username: user.username,
      password: user.password
    }))
      .then((response) => {
        localStorage.setItem('id_token',response.data.token)
        if(response.data.message == 'fail') {
          dispatch({type: "LOGIN_FAILURE", payload: "Bad user or password"})
        } else {
          dispatch({type: "LOGIN_SUCCESS", payload: response.data})
        }
      })
      .catch((err) => {
        dispatch({type: "LOGIN_FAILURE", payload: err})
      })
  }
}

export function logoutUser(user) {
  return function(dispatch) {
    localStorage.removeItem('id_token');
    dispatch({type: "LOGOUT_SUCCESS"});
  }
}
