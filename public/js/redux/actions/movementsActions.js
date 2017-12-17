import axios from "axios";
import * as types from "../types";

export function fetchMovements() {
  return function (dispatch) {
      const config = {headers: {'x-access-token': localStorage.getItem("id_token")}};
      dispatch({ type: types.FETCH_MOVEMENTS_PENDING });
    
    axios.get(_API_HOST+"/api/training/movementsname", config)
      .then((response) => {
        dispatch({ type: types.FETCH_MOVEMENTS_FULFILLED, payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: types.FETCH_MOVEMENTS_REJECTED, payload: err })
      })
  }
}