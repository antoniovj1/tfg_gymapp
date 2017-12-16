import React from "react";
import ReactDOM from "react-dom";
import {browserHistory, IndexRoute, Route, Router} from "react-router";

import {Provider} from "react-redux"
import store from "./store"


import SessionList from "./pages/SessionList";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SessionDetail from "./pages/SessionDetail";
import SessionNew from "./pages/SessionNew";
import App from "./pages/App/App"
import AuthService from './utils/AuthService';


const requireAuth = (nextState, replace) => {  
  if (!AuthService.loggedIn()) {
    replace({ pathname: '/login' })
  }
};

const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={SessionList} />
        <Route path="/profile" component={Profile} onEnter={requireAuth}/>
        <Route path="/session/new" component={SessionNew} onEnter={requireAuth} />
        <Route path="/session/:id" component={SessionDetail} onEnter={requireAuth} />
        <Route path="/login" component={Login} />
      </Route>
    </Router>
  </Provider>,
  app);
