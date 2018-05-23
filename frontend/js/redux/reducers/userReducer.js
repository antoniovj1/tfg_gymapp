import * as types from '../types';

export default function reducer(
  state = {
    user: [],
    stats: {},
    fetchingUser: false,
    fetchedUser: false,
    errorUser: null,
    fetchingStats: false,
    fetchedStats: false,
    errorStats: null
  },
  action
) {
  switch (action.type) {
    case types.FETCH_ACTUALUSER_PENDING: {
      return { ...state, fetchingUser: true };
    }
    case types.FETCH_ACTUALUSER_REJECTED: {
      return { ...state, fetchingUser: false, errorUser: action.payload };
    }
    case types.FETCH_ACTUALUSER_FULFILLED: {
      return {
        ...state,
        fetchingUser: false,
        fetchedUser: true,
        user: action.payload
      };
    }
    case types.FETCH_STATS_PENDING: {
      return { ...state, fetchingStats: true };
    }
    case types.FETCH_STATS_REJECTED: {
      return { ...state, fetchingStats: false, errorStats: action.payload };
    }
    case types.FETCH_STATS_FULFILLED: {
      return {
        ...state,
        fetchingStats: false,
        fetchedStats: true,
        stats: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
