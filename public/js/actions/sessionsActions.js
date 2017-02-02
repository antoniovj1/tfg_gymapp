import axios from "axios";

export function fetchSessions() {
  return function (dispatch) {
    var config = { headers: { 'x-access-token': localStorage.getItem("id_token"), 'profile': localStorage.getItem("profile") } };
    dispatch({ type: "FETCH_SESSION_PENDING" });

    axios.get(_API_HOST + "/api/training/sessions", config)
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
    var config = { headers: { 'x-access-token': localStorage.getItem("id_token"), 'profile': localStorage.getItem("profile") } };
    dispatch({ type: "FETCH_COMPLETESESSION_PENDING" });
    var url = _API_HOST + "/api/training/sessions/" + id;
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
    var config = { headers: { 'x-access-token': localStorage.getItem("id_token"), 'profile': localStorage.getItem("profile") } };

    var regex = session.time.match(/([01]\d|2[0-3]):([0-5]\d)/);
    var seconds = regex[1] * 3600 + regex[2] * 60;

    var dataSession = { time: seconds, date: session.date };
    var dataExerises = session.exercises;
    
    dispatch({ type: "PUSH_SESSION_PENDING" });

    axios.post(_API_HOST + "/api/training/sessions", dataSession, config)
      .then((responseSession) => {
        var url = _API_HOST + "/api/training/sessions/" + responseSession.data.session + "/exercise";

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