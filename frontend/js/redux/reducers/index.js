import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import sessions from "./sessionsReducer";
import user from "./userReducer";
import authReducer from "./authReducer";
import movements from "./movementsReducer";

export default combineReducers({
  sessions,
  movements,
  user,
  login: authReducer,
  form: formReducer
});
