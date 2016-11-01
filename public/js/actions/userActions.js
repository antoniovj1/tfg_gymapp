import axios from "axios";

export function fetchActualUser() {
  return function(dispatch) {
    axios.get("http://127.0.0.1:8080/api/users_me")
      .then((response) => {
        dispatch({type: "FETCH_ACTUALUSER_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_ACTUALUSER_REJECTED", payload: err})
      })
  }
}
