export default function reducer(state={
  sessions: [],
  completeSession: "A",
  fetching: false,
  fetched: false,
  error: null,
}, action) {

  switch (action.type) {
    case "FETCH_SESSION": {
      return {...state, fetching: true}
    }
    case "FETCH_SESSION_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_SESSION_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        sessions: action.payload, completeSession: "BBBB"
      }
    }
    case "FETCH_COMPELTESESSION": {
      return {...state, fetching: true}
    }
    case "FETCH_COMPELTESESSION_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_SESSIONCOMPLETE_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        completeSession: "BBBB"
      }
    }
  }
  console.log("AQUI -->" + action.type );
  return state
}
