import React from "react";
import { connect } from "react-redux"
import Exercise from "../components/Exercise"

import {secondsToHms, dateFormat} from "../utils"

import { fetchCompleteSession } from "../actions/sessionsActions"

@connect((store) => {
  return {
    completeSession: store.sessions.completeSession,
  };
})

export default class SessionDetail extends React.Component {

  componentDidMount(){
    var url = this.props.location.pathname;
    var id = url.substring(url.lastIndexOf("/")+1);
    this.props.dispatch(fetchCompleteSession(id));
  }

  render() {

    const {completeSession} = this.props;

    if(completeSession) {
      var {session,sets,movements,exercise} = completeSession;

      var time = 0;
      var date = "";
      if(session){
        if( session.time != 'undefinded')
        time = secondsToHms(session.time);

        if(typeof session.date != 'undefinded')
        date = dateFormat(session.date);
      }

      var pesoTot = 0;
      var nSets = 0;
      if (sets) {
        sets.forEach( function(subSet){
          subSet.forEach(function(set) {
            pesoTot+= set.weight;
            nSets++;
          });
        });
      }

      var groups = [];

      exercise.forEach(function (ex) {
        var grouped = {exercise: ex, movement:null,set: null} ;
        movements.forEach(function(mov){
          if(mov._id == ex.movement){
            grouped.movement = mov;
          }
        })
        sets.forEach(function (set) {
          if(set[0].exercise == ex._id){
            grouped.set = set;
          }
        })
        groups.push(grouped);
      });
    }

    if(groups){
      return (
        <div>
        <div class="row">
        <div class = "col-md-3 well"> Fecha: {date} <br/><br/></div>
        <div class = "col-md-3 well"> Tiempo: {time} <br/><br/></div>
        <div class = "col-md-3 well"> Total series: {nSets}  <br/><br/></div>
        <div class = "col-md-3 well"> Peso total: {pesoTot} Kg <br/><br/></div>
        </div>
        <div class="row">
        <div class = "col-md-3 well"> TEST </div>
        <div class = "col-md-9">
        {groups.map(function(group) {
          return <Exercise key={group.exercise._id} group={group}/>;
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
