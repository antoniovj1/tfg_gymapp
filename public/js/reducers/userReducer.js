export default function reducer(state={
  user: [],
  fetching: false,
  fetched: false,
  error: null,
}, action) {

  switch (action.type) {
    case "FETCH_ACTUALUSER": {
      return {...state, fetching: true}
    }
    case "FETCH_ACTUALUSER_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_ACTUALUSER_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        user: action.payload,
      }
    }
  }

  return state
}
