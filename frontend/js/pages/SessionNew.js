import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SessionNewForm from '../components/SessionNewForm';
import { pushSession, pushSessionCompleted } from '../redux/actions/sessionsActions';

@connect(store => ({
  sessions: store.sessions
}))
class SessionNew extends React.Component {
  handleSubmit = values => {
    this.props.dispatch(pushSession(values));
  };

  render() {
    if (this.props.sessions.pushed) {
      this.props.history.push('/');
      this.props.dispatch(pushSessionCompleted());
      return null;
    }
    return <SessionNewForm onSubmit={this.handleSubmit} />;
  }
}

export default withRouter(SessionNew);
