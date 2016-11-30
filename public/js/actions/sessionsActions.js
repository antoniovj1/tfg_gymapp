import axios from "axios";

export function fetchSessions() {
  return function (dispatch) {
    var config = { headers: { 'x-access-token': localStorage.getItem("id_token") } };
    dispatch({ type: "FETCH_SESSION_PENDING" });
    axios.get("http://127.0.0.1:8080/api/training/sessions", config)
      .then((response) => {
        dispatch({ type: "FETCH_SESSION_FULFILLED", payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: "FETCH_SESSION_REJECTED", payload: err })
      })
  }
}

export function fetchCompleteSession(id) {
  return function (dispatch) {
    var config = { headers: { 'x-access-token': localStorage.getItem("id_token") } };
    dispatch({ type: "FETCH_COMPLETESESSION_PENDING" });
    var url = "http://127.0.0.1:8080/api/training/sessions/" + id;
    axios.get(url, config)
      .then((response) => {
        dispatch({ type: "FETCH_COMPLETESESSION_FULFILLED", payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: "FETCH_COMPLETESESSION_REJECTED", payload: err })
      })
  }
}

export function pushSession(session) {
  return function (dispatch) {
    var config = { headers: { 'x-access-token': localStorage.getItem("id_token") } };
    var dataSession = { time: session.time, date: session.date };
    var dataExerises = session.exercises;
    dispatch({ type: "PUSH_SESSION_PENDING" });

    axios.post("http://127.0.0.1:8080/api/training/sessions", dataSession, config)
      .then((responseSession) => {
        var url = "http://127.0.0.1:8080/api/training/sessions/" + responseSession.data.session + "/exercise";

        var promises = [];
        var responsesExercise = {};

        dataExerises.forEach(function (exercise) {
          var parsedEx = { session: responseSession.data.session, movement: exercise.exerciseName, sets: exercise.sets };
          promises.push(axios.post(url, parsedEx, config))
        });

        return [axios.all(promises).then(function (results) {
                  results.forEach(function (response) {
                     responsesExercise[response.identifier] = response.value;
                  })
               }), 
               responseSession, responsesExercise]
      })
      .then((values) => {
        dispatch({ type: "PUSH_SESSION_FULFILLED", payload: values })
      })
      .catch((err) => {
        dispatch({ type: "PUSH_SESSION_REJECTED", payload: err })
      })
  }
}