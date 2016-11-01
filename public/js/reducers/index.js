import { combineReducers } from "redux"

import sessions from "./sessionsReducer"
import user from "./userReducer"

export default combineReducers({
  sessions,
  user,
})
