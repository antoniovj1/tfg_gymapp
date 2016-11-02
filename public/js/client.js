import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import thunk from 'redux-thunk'

import { Provider } from "react-redux"
import store from "./store"


import SessionList from "./pages/SessionList";
import Layout from "./pages/Layout";
import Profile from "./pages/Profile";
import SessionDetail from "./pages/SessionDetail";


export default class Foo extends React.Component {
  render() {
    return (
        <div>
          <img src="http://www.freeimageslive.com/galleries/workplace/tools/pics/engineering_design.jpg" alt="..." class="img-responsive img-rounded center-block" />
        </div>
    );
  }
}

const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={SessionList}></IndexRoute>
      <Route path="/profile" component={Profile}></Route>
      <Route path="/session/:id" component={SessionDetail}></Route>
    </Route>
  </Router>
  </Provider>,
app);
