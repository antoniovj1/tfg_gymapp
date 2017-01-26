export default function reducer(state = {
  movements: [],
  fetching: false,
  fetched: false,
  error: null,
}, action) {

  switch (action.type) {
    case "FETCH_MOVEMENTS_PENDING": {
      return {...state, fetching: true }
    }
    case "FETCH_MOVEMENTS_REJECTED": {
      return {...state, fetching: false, error: action.payload }
    }
    case "FETCH_MOVEMENTS_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        movements: action.payload
      }
    }
  }
  return state
}
