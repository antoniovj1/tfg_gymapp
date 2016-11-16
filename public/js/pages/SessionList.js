import React from "react";
import { connect } from "react-redux"
import { Link } from 'react-router'

import SessionItem from "../components/SessionItem"
import { fetchSessions } from "../actions/sessionsActions"


@connect((store) => {
  return {
    sessions: store.sessions.sessions,
  };
})

export default class Session extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchSessions());
  }


  render() {

    const {sessions} = this.props;

    return (
      <div>
        <Link to={`/session/new`}><button type="button" class="btn btn-default"> Nueva Sesión</button> </Link>

        <div> {sessions.map(function (session) {
          return <SessionItem key={session._id} session={session} />;
        })}
        </div>
      </div>
    );
  }
}
