import React from "react";
import { connect } from "react-redux"
import Exercise from "../components/Exercise"

import { secondsToHms, dateFormat } from "../utils"

import { fetchCompleteSession } from "../actions/sessionsActions"

@connect((store) => {
  return {
    completeSession: store.sessions.completeSession,
  };
})

export default class SessionDetail extends React.Component {

  componentDidMount() {
    var url = this.props.location.pathname;
    var id = url.substring(url.lastIndexOf("/") + 1);
    this.props.dispatch(fetchCompleteSession(id));
  }

  render() {
    const {completeSession} = this.props;

    if (completeSession) {
      var {session} = completeSession;
      var {id, date, time, exercises} = session;

      
      
      if (session) {
        if (time != 'undefinded')
          time = secondsToHms(time);

        if (typeof date != 'undefinded')
          date = dateFormat(date);
      }

      var pesoTot = 0;
      var nSets = 0;

      if (exercises) {
        exercises.forEach(function (exercise) {
          var sets = exercise.sets;
          sets.forEach(function (set) {
            pesoTot += set.weight;
            nSets++;
          });
        });
      }
    }

    if (exercises) {
      return (
        <div>
          <div class="row">
            <div class="col-md-3 well"> Fecha: {date} <br /><br /></div>
            <div class="col-md-3 well"> Tiempo: {time} <br /><br /></div>
            <div class="col-md-3 well"> Total series: {nSets}  <br /><br /></div>
            <div class="col-md-3 well"> Peso total: {pesoTot}Kg <br /><br /></div>
          </div>
          <div class="row">
            <div class="col-md-3 well"> TEST </div>
            <div class="col-md-9">
              {exercises.map(function (exercise) {
                return <Exercise key={exercise._id} exercise={exercise} />;
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }

  }
}
