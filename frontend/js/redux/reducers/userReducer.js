import * as types from '../types';

export default function reducer(
  state = {
    user: [],
    fetching: false,
    fetched: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case types.FETCH_ACTUALUSER_PENDING: {
      return { ...state, fetching: true };
    }
    case types.FETCH_ACTUALUSER_REJECTED: {
      return { ...state, fetching: false, error: action.payload };
    }
    case types.FETCH_ACTUALUSER_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        user: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
