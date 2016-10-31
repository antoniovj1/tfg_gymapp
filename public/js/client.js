import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import thunk from 'redux-thunk'



import Session from "./components/Session";
import Layout from "./pages/Layout";
import Profile from "./pages/Profile";


const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Session}></IndexRoute>
      <Route path="/profile" component={Profile}></Route>
    </Route>
  </Router>,
app);
