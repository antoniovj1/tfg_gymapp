import axios from "axios";
import * as types from "../types";

export function fetchSessions() {
  return function(dispatch) {
    const config = {
      headers: {
        "x-access-token": localStorage.getItem("id_token"),
        profile: localStorage.getItem("profile")
      }
    };
    dispatch({ type: types.FETCH_SESSION_PENDING });

    axios
      .get(`${_API_HOST}/api/training/sessions`, config)
      .then(response => {
        dispatch({
          type: types.FETCH_SESSION_FULFILLED,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({ type: types.FETCH_SESSION_REJECTED, payload: err });
      });
  };
}

export function fetchCompleteSession(id) {
  return function(dispatch) {
    const config = {
      headers: {
        "x-access-token": localStorage.getItem("id_token"),
        profile: localStorage.getItem("profile")
      }
    };
    dispatch({ type: types.FETCH_COMPELTESESSION_PENDING });
    const url = `${_API_HOST}/api/training/sessions/${id}`;
    axios
      .get(url, config)
      .then(response => {
        dispatch({
          type: types.FETCH_COMPLETESESSION_FULFILLED,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({ type: types.FETCH_COMPELTESESSION_REJECTED, payload: err });
      });
  };
}

export function pushSession(session) {
  return function(dispatch) {
    const config = {
      headers: {
        "x-access-token": localStorage.getItem("id_token"),
        profile: localStorage.getItem("profile")
      }
    };

    const regex = session.time.match(/([01]\d|2[0-3]):([0-5]\d)/);
    const seconds = regex[1] * 3600 + regex[2] * 60;

    const dataSession = { time: seconds, date: session.date };
    const dataExerises = session.exercises;

    dispatch({ type: types.PUSH_SESSION_PENDING });

    axios
      .post(`${_API_HOST}/api/training/sessions`, dataSession, config)
      .then(responseSession => {
        const url = `${_API_HOST}/api/training/sessions/${responseSession.data.session}/exercise`;

        const promises = [];
        const responsesExercise = {};

        dataExerises.forEach(exercise => {
          const parsedEx = {
            session: responseSession.data.session,
            movement: exercise.exerciseName,
            sets: exercise.sets
          };
          promises.push(axios.post(url, parsedEx, config));
        });

        return [
          axios.all(promises).then(results => {
            results.forEach(response => {
              responsesExercise[response.identifier] = response.value;
            });
          }),
          responseSession,
          responsesExercise
        ];
      })
      .then(values => {
        dispatch({ type: types.PUSH_SESSION_FULFILLED, payload: values });
      })
      .catch(err => {
        dispatch({ type: types.PUSH_SESSION_REJECTED, payload: err });
      });
  };
}
