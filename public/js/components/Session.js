import React from "react";
import { connect } from "react-redux"
import { Link } from 'react-router'

import { fetchSessions } from "../actions/sessionsActions"

@connect((store) => {
  return {
    sessions: store.sessions.sessions,
  };
})

export default class Session extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchSessions())
  }

  render() {
    function secondsToHms(d) {
      d = Number(d);
      var h = Math.floor(d / 3600);
      var m = Math.floor(d % 3600 / 60);
      var s = Math.floor(d % 3600 % 60);
      return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
    }

    function dateFormat(dat) {
      var d = new Date(dat);
      var date = d.getDate();
      var month = d.getMonth();
      month++;
      var year = d.getFullYear();
      var hour = d.getHours();
      var minute = d.getMinutes();
      return(month + "/" + date + "/" + year + " - " + hour + ":" + minute);
    }

    const {sessions} = this.props;

    const mappedSession = sessions.map(session =>
      <Link to={`/session/${session._id}`}>
      <div class="row well text-center" key = {session._id}>
        <div class="col-lg-4">Fecha: {dateFormat(session.date)} </div>
        <div class="col-lg-4">Duración: {secondsToHms(session.time)} </div>
        <div class="col-lg-4">Total Peso: </div>
      </div>
      </Link>)

    return (
      <div> {mappedSession} </div>
    );
  }
}
