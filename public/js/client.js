import React from "react";
import ReactDOM from "react-dom";
import { Route, Router} from "react-router-dom";
import { hot } from 'react-hot-loader';
import {Provider} from "react-redux"
import createBrowserHistory from 'history/createBrowserHistory';
import store from "./store"
import App from "./pages/App"
import * as AuthService from './utils/AuthService';

const requireAuth = (nextState, replace) => {  
  if (!AuthService.loggedIn()) {
    replace({ pathname: '/login' })
  }
};

const app = document.getElementById('app');
const bHistory = createBrowserHistory();

export default hot(module)(
ReactDOM.render(
  <Provider store={store}>
    <Router history={bHistory}>
      <Route path="/" component={App}/>
    </Router>
  </Provider>,
  app));
