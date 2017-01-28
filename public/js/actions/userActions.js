import axios from "axios";

export function fetchActualUser() {
  return function(dispatch) {
    var config = {headers: {'x-access-token': localStorage.getItem("id_token")}};
    dispatch({type: "FETCH_ACTUALUSER_PENDING"});
    axios.get(_API_HOST+"/api/users_me",config)
      .then((response) => {
        dispatch({type: "FETCH_ACTUALUSER_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_ACTUALUSER_REJECTED", payload: err})
      })
  }
}
