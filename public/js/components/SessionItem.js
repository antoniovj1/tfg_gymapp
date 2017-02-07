import React from "react";
import { Link } from 'react-router'
import {secondsToHms, dateFormat} from "../utils/time"

export default class SessionItem extends React.Component {

  render() {
    const {session} = this.props;

    return (
      <div>
      <Link to={`/session/${session._id}`}>
      <div class="row well text-center">
        <div class="col-lg-6">Fecha: {dateFormat(session.date)} </div>
        <div class="col-lg-6">Duración: {secondsToHms(session.time)} </div>
      </div>
      </Link>
     </div>
    );
  }
}
