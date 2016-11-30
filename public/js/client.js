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



export default class Foo extends React.Component {
  render() {
    return (
      <div>
        <img src="http://www.freeimageslive.com/galleries/workplace/tools/pics/engineering_design.jpg" alt="..." class="img-responsive img-rounded center-block" />
      </div>
    );
  }
}

function requireAuth(nextState, replace) {  
  if (!store.getState().login.isAuthenticated) {
    replace({
      pathname: '/login',
      state: {nextPathname: nextState.location.pathname}
    })
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
