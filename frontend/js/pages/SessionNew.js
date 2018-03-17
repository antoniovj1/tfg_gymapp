import React from "react";
import { connect } from "react-redux";
import SessionNewForm from "../components/SessionNewForm";
import { pushSession } from "../redux/actions/sessionsActions";
import { browserHistory } from "react-router-dom";

@connect(store => ({
  sessions: store.sessions
}))
export default class SessionNew extends React.Component {
  handleSubmit = values => {
    this.props.dispatch(pushSession(values));
  };

  render() {
    if (this.props.sessions.pushed) {
      browserHistory.push("/");
    } else {
      return <SessionNewForm onSubmit={this.handleSubmit} />;
    }
  }
}
