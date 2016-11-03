import { combineReducers } from "redux"

import sessions from "./sessionsReducer"
import user from "./userReducer"
import login from "./loginReducer"

export default combineReducers({
  sessions,
  user,
  login,
})
