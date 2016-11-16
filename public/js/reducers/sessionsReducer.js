export default function reducer(state = {
  sessions: [],
  completeSession: null,
  fetching: false,
  fetched: false,
  pushing: false,
  pushed: false,
  error: null,
}, action) {

  switch (action.type) {
    case "FETCH_SESSION_PENDING": {
      return {...state, fetching: true }
    }
    case "FETCH_SESSION_REJECTED": {
      return {...state, fetching: false, error: action.payload }
    }
    case "FETCH_SESSION_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        sessions: action.payload
      }
    }
    ////////////////////////////////////////
    case "FETCH_COMPELTESESSION_PENDING": {
      return {...state, fetching: true }
    }
    case "FETCH_COMPELTESESSION_REJECTED": {
      return {...state, fetching: false, error: action.payload }
    }
    case "FETCH_COMPLETESESSION_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        completeSession: action.payload
      }
    }
    ////////////////////////////////////////
    case "PUSH_SESSION_PENDING": {
      return {...state, pushing: true }
    }
    case "PUSH_SESSION_REJECTED": {
      return {...state, pushing: false, error: action.payload }
    }
    case "PUSH_SESSION_FULFILLED": {
      return {...state, pushing: false, pushed: true }
    }
  }
  return state
}
