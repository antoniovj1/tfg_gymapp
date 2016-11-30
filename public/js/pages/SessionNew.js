import React from "react";

import SessionNewForm from "../components/SessionNewForm";
import { connect } from "react-redux"

import { pushSession } from "../actions/sessionsActions"


@connect((store) => {
  return {
    sessions: store.sessions,
  };
})

export default class SessionNew extends React.Component {
  handleSubmit = (values) => {
    this.props.dispatch(pushSession(values));

  }
  render() {
    return (
      <SessionNewForm onSubmit={this.handleSubmit} />
    );
  }
}