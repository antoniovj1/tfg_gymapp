import React from "react";
import {Link} from 'react-router'
import {dateFormat, secondsToHms} from "../utils/time"
import Paper from 'material-ui/Paper';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Date from 'material-ui/svg-icons/action/date-range';
import Clock from 'material-ui/svg-icons/device/access-time'

const style = {
    height: '100%',
    width: 100 + '%',
    textAlign: 'center',
    display: 'inline-block',
};

const text = {
    marginTop:'20px',
    WebkitTransformStyle: 'preserve-3d',
    MozTransformSyle: 'preserve-3d',
    transformStyle: 'preserve-3d',
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
}

export default class SessionItem extends React.Component {

  render() {
    const {session} = this.props;

    return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Link to={`/session/${session._id}`}>
                <Paper style={style} zDepth={2} >
                  <div style={text}  class="col-lg-6"> <Date/> Fecha: {dateFormat(session.date)} </div>
                  <div style={text} class="col-lg-6"> <Clock/> Duración: {secondsToHms(session.time)} </div>
              </Paper>
            </Link>
        </MuiThemeProvider>
    );
  }
}
