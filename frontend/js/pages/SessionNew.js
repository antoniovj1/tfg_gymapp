import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SessionNewForm from '../components/SessionNewForm';
import { pushSession } from '../redux/actions/sessionsActions';

@connect(store => ({
  sessions: store.sessions
}))
class SessionNew extends React.Component {
  handleSubmit = values => {
    this.props.dispatch(pushSession(values));
  };

  componentWillReceiveProps() {
    if (this.props.sessions.pushed) {
      this.props.pushed = false;
      this.props.history.push('/');
    }
  }

  render() {
    return <SessionNewForm onSubmit={this.handleSubmit} />;
  }
}

export default withRouter(SessionNew);
