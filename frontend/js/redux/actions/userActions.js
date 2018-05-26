import axios from 'axios';
import * as types from '../types';

export function fetchActualUser() {
  return function(dispatch) {
    dispatch({ type: types.FETCH_ACTUALUSER_PENDING });

    if (localStorage.getItem('profile')) {
      dispatch({
        type: types.FETCH_ACTUALUSER_FULFILLED,
        payload: JSON.parse(localStorage.getItem('profile'))
      });
    } else {
      dispatch({ type: types.FETCH_ACTUALUSER_REJECTED, payload: 'No profile' });
    }
  };
}

function getTotals(config) {
  return axios.get(`${_API_HOST}/api/training/totals`, config);
}
function getTopN(config) {
  return axios.get(`${_API_HOST}/api/training/topn`, config);
}
function getMuscleStats(config, days = 10) {
  return axios.get(`${_API_HOST}/api/training/musclestats/${days}`, config);
}

export function fetchStats() {
  return function(dispatch) {
    const config = {
      headers: { 'x-access-token': localStorage.getItem('id_token') }
    };
    dispatch({ type: types.FETCH_STATS_PENDING });

    Promise.all([getTotals(config), getMuscleStats(config), getTopN(config)])
      .then(([totals, musclestats, topn]) => {
        totals = totals.data;
        musclestats = musclestats.data;
        topn = topn.data;
        dispatch({
          type: types.FETCH_STATS_FULFILLED,
          payload: { totals, musclestats, topn }
        });
      })
      .catch(err => {
        dispatch({ type: types.FETCH_STATS_REJECTED, payload: err });
      });
  };
}
