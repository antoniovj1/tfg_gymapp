import React from 'react';
import {Link} from 'react-router';
import SessionStore from '../stores/SessionStore';
import SessionActions from '../actions/SessionActions';

import { Panel } from 'react-bootstrap';


class Session extends React.Component {
  constructor(props) {
    super(props);
    this.state = SessionStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    SessionStore.listen(this.onChange);
    SessionActions.getSessions();
  }

  componentWillUnmount() {
    SessionStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }


  render() {
    let sessions = this.state.sessions.map((session) => {
      return (
        <li key={session.id}>
          Hola
        </li>
      )
    });

    return (
      <div>
        <Panel header="Session">
          Panel content
        </Panel>
      </div>
    );
  }
}

export default Session;
