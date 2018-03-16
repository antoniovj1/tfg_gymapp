import * as types from "../types";

export default function reducer(
  state = {
    sessions: [],
    completeSession: null,
    fetching: false,
    fetched: false,
    pushing: false,
    pushed: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case types.FETCH_SESSION_PENDING: {
      return { ...state, fetching: true };
    }
    case types.FETCH_SESSION_REJECTED: {
      return { ...state, fetching: false, error: action.payload };
    }
    case types.FETCH_SESSION_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        sessions: action.payload
      };
    }
    // //////////////////////////////////////
    case types.FETCH_COMPELTESESSION_PENDING: {
      return { ...state, fetching: true };
    }
    case types.FETCH_COMPELTESESSION_REJECTED: {
      return { ...state, fetching: false, error: action.payload };
    }
    case types.FETCH_COMPLETESESSION_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        completeSession: action.payload
      };
    }
    // //////////////////////////////////////
    case types.PUSH_SESSION_PENDING: {
      return { ...state, pushing: true };
    }
    case types.PUSH_SESSION_REJECTED: {
      return { ...state, pushing: false, error: action.payload };
    }
    case types.PUSH_SESSION_FULFILLED: {
      return { ...state, pushing: false, pushed: true };
    }
    default: {
      return state;
    }
  }
}
