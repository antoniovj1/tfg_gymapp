import { combineReducers } from "redux"

import sessions from "./sessionsReducer"
import user from "./userReducer"
import login from "./loginReducer"
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  sessions,
  user,
  login,
  form: formReducer, 
})
