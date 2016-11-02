import axios from "axios";

export function fetchSessions() {
  return function(dispatch) {
    var config = {headers: {'x-access-token': localStorage.getItem("id_token")}};
    dispatch({type: "FETCH_SESSION_PENDING"});
    axios.get("http://127.0.0.1:8080/api/training/session", config)
      .then((response) => {
        dispatch({type: "FETCH_SESSION_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_SESSION_REJECTED", payload: err})
      })
  }
}

export function fetchCompleteSession(id) {
  return function(dispatch) {
    var config = {headers: {'x-access-token': localStorage.getItem("id_token")}};
    dispatch({type: "FETCH_COMPLETESESSION_PENDING"});
    var url = "http://127.0.0.1:8080/api/training/session/byId/" + id;
    axios.get(url,config)
      .then((response) => {
        dispatch({type: "FETCH_COMPLETESESSION_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_COMPLETESESSION_REJECTED", payload: err})
      })
  }
}
