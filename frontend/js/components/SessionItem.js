import React from 'react';
import { Link } from 'react-router-dom';
import Date from 'material-ui-icons/DateRange';
import Paper from 'material-ui/Paper';
import Clock from 'material-ui-icons/AccessTime';
import Grid from 'material-ui/Grid';
import { dateFormat, secondsToHms } from '../utils/time';

const style = {
  height: '100%',
  width: '100%',
  textAlign: 'center',
  display: 'inline-block',
  marginBottom: '10px'
};

const SessionItem = ({ session }) => (
  <Link to={`/session/${session._id}`} style={{ color: '#4a5482' }}>
    <Paper style={style}>
      <Grid container spacing={24} style={{ margin: '0 auto', textAlign: 'left' }}>
        <Grid item xs={12} sm={6}>
          <span style={{ marginLeft: '70px', marginTop: '30px' }}>
            <Date /> <span style={{ fontSize: '150%', fontWeight: 'bold' }}>Fecha:</span>{' '}
            {dateFormat(session.date)}
          </span>
        </Grid>
        <Grid item xs={12} sm={6}>
          <span style={{ marginLeft: '40px', marginTop: '30px' }}>
            <Clock /> <span style={{ fontSize: '150%', fontWeight: 'bold' }}>Duración: </span>
            {secondsToHms(session.time)}
          </span>
        </Grid>
      </Grid>
    </Paper>
  </Link>
);

export default SessionItem;
