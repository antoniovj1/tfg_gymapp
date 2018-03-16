import React from "react";

import SessionNewForm from "../components/SessionNewForm";
import {connect} from "react-redux"

import {pushSession} from "../redux/actions/sessionsActions"

@connect((store) => ({
    sessions: store.sessions,
  }))

export default class SessionNew extends React.Component {
  handleSubmit = (values) => {
    this.props.dispatch(pushSession(values));
  };

  render() {
    if (this.props.sessions.pushed) {
      window.location.replace('/')
    } else {
      return (
        <SessionNewForm onSubmit={this.handleSubmit} />
      );
    }
  }
}