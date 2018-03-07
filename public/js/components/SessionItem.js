import React from 'react';
import { Link } from 'react-router';
import Date from 'material-ui-icons/DateRange';
import Paper from 'material-ui/Paper';
import Clock from 'material-ui-icons/AccessTime';
import { dateFormat, secondsToHms } from '../utils/time';

const style = {
  height: '100%',
  width: '100%',
  textAlign: 'center',
  display: 'inline-block'
};

const text = {
  marginTop: '20px',
  WebkitTransformStyle: 'preserve-3d',
  MozTransformSyle: 'preserve-3d',
  transformStyle: 'preserve-3d',
  position: 'relative',
  top: '50%',
  transform: 'translateY(-50%)'
};

const SessionItem = ({ session }) => (
  <Link to={`/session/${session._id}`}>
    <Paper style={style}>
      <div style={text} className="col-lg-6">
        {' '}
        <Date /> Fecha: {dateFormat(session.date)}{' '}
      </div>
      <div style={text} className="col-lg-6">
        {' '}
        <Clock /> Duración: {secondsToHms(session.time)}{' '}
      </div>
    </Paper>
  </Link>
);

export default SessionItem;