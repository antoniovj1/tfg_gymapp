import React from "react";
import { connect } from "react-redux"
import { Link } from 'react-router'

//import injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin();

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import SessionItem from "../components/SessionItem"

import { fetchSessions } from "../actions/sessionsActions"


@connect((store) => {
  return {
    sessions: store.sessions.sessions,
  };
})

export default class Session extends React.Component {
  constructor() {
    super(...arguments);
  }

  componentWillMount() {
    this.props.dispatch(fetchSessions());
  }

  render() {

    const {sessions} = this.props;    

    if (sessions.length > 0) {
      return (        
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
            <Link to={`/session/new`}><FloatingActionButton> <ContentAdd /> </FloatingActionButton> </Link>
            <div> {sessions.map(function (session) {
              return <SessionItem key={session._id} session={session} />; })}
            </div>
          </div >
        </MuiThemeProvider>

      );
    }
    else {
      return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
            <Link to={`/session/new`}><FloatingActionButton> <ContentAdd /> </FloatingActionButton> </Link>
            <div> <h1>Añade una nueva session</h1> </div>
          </div >
        </MuiThemeProvider>
      );
    }
  }

}
