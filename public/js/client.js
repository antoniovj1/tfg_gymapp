import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import thunk from 'redux-thunk'

import { Provider } from "react-redux"
import store from "./store"


import Login from "./pages/Login";
import SessionList from "./pages/SessionList";
import Layout from "./pages/Layout";
import Profile from "./pages/Profile";
import SessionDetail from "./pages/SessionDetail";
import SessionNew from "./pages/SessionNew";

import AuthService from './utils/AuthService'

const auth = new AuthService('2h46y4JQDnuS6FvfTlQpa0NRP61hxL9Y', 'antoniovj1.eu.auth0.com');


const requireAuth = (nextState, replace) => {  
  if (!AuthService.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <Route path="/login" component={Login}></Route>
        <IndexRoute component={SessionList} onEnter={requireAuth}></IndexRoute>
        <Route path="/profile" component={Profile} onEnter={requireAuth}></Route>
        <Route path="/session/new" component={SessionNew} onEnter={requireAuth} ></Route>
        <Route path="/session/:id" component={SessionDetail} onEnter={requireAuth} ></Route>
      </Route>
    </Router>
  </Provider>,
  app);
