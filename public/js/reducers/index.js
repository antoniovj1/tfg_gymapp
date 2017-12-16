import {combineReducers} from "redux"

import sessions from "./sessionsReducer"
import user from "./userReducer"
import authReducer from "./auth"
import movements from "./movementsReducer"

import {reducer as formReducer} from 'redux-form'


export default combineReducers({
  sessions,
  movements,
  user,
  login:authReducer,
  form: formReducer, 
})
