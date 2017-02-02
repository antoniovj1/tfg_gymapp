import axios from "axios";

export function fetchMovements() {
  return function (dispatch) {
    var config = { headers: { 'x-access-token': localStorage.getItem("id_token"), 'profile': localStorage.getItem("profile") } };
    dispatch({ type: "FETCH_MOVEMENTS_PENDING" });
    
    axios.get(_API_HOST+"/api/training/movementsname", config)
      .then((response) => {
        dispatch({ type: "FETCH_MOVEMENTS_FULFILLED", payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: "FETCH_MOVEMENTS_REJECTED", payload: err })
      })
  }
}