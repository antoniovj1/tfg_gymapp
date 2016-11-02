export default function reducer(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false,
    error: null,
  }, action) {

  switch (action.type) {
    case "LOGIN_REQUEST":{
      return {...state,
        isFetching: true,
        isAuthenticated: false,
        user: action.payload
      }
    }
    case "LOGIN_SUCCESS":{
      return {...state,
        isFetching: false,
        isAuthenticated: true,
      }
    }
    case "LOGIN_FAILURE":{
      return {...state,
        isFetching: false,
        isAuthenticated: false,
        error: action.payload
      }
    }
    case "LOGOUT_SUCCESS":{
      return {...state,
        isFetching: true,
        isAuthenticated: false
      }
    }
  }
  return state
}
