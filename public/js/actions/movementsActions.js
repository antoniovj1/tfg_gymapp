import axios from "axios";

export function fetchMovements() {
  return function (dispatch) {
    var config = { headers: { 'x-access-token': localStorage.getItem("id_token") } };
    dispatch({ type: "FETCH_MOVEMENTS_PENDING" });
    axios.get("http://127.0.0.1:8080/api/training/movementsname", config)
      .then((response) => {
        dispatch({ type: "FETCH_MOVEMENTS_FULFILLED", payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: "FETCH_MOVEMENTS_REJECTED", payload: err })
      })
  }
}