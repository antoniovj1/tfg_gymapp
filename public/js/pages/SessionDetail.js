import React from "react";
import { connect } from "react-redux"

import { fetchCompleteSession } from "../actions/sessionsActions"

@connect((store) => {
  return {
    completeSession: store.sessions.completeSession,
  };
})

export default class SessionDetail extends React.Component {

  componentWillMount() {
      var url = this.props.location.pathname
      var id = url.substring(url.lastIndexOf("/")+1);
      this.props.dispatch(fetchCompleteSession(id))
    }

  render() {
  //  const {exercise} = this.props;
  //  console.log(this.props);
  const {completeSession} = this.props;
    return (
      <div> </div>
    );
  }
}
