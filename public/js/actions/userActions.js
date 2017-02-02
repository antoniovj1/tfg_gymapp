import axios from "axios";

export function fetchActualUser() {
  return function (dispatch) {
    dispatch({ type: "FETCH_ACTUALUSER_PENDING" });

    if (localStorage.getItem("profile")) {
      dispatch({ type: "FETCH_ACTUALUSER_FULFILLED", payload: JSON.parse(localStorage.getItem("profile")) })
    }
    else {
      dispatch({ type: "FETCH_ACTUALUSER_REJECTED", payload: 'No profile' })
    }
  }
}
