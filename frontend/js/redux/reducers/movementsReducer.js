import * as types from '../types';

export default function reducer(
  state = {
    movements: [],
    fetching: false,
    fetched: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case types.FETCH_MOVEMENTS_PENDING: {
      return { ...state, fetching: true };
    }
    case types.FETCH_MOVEMENTS_REJECTED: {
      return { ...state, fetching: false, error: action.payload };
    }
    case types.FETCH_MOVEMENTS_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        movements: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
