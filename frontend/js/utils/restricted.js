import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as AuthService from './AuthService';

function checkAuthentication(params) {
  const { history } = params;
  if (!AuthService.loggedIn()) {
    history.replace({ pathname: '/login' });
  }
}

/**
 * Higher-order component (HOC) to wrap restricted pages
 */
export default BaseComponent => {
  class Restricted extends Component {
    componentWillMount() {
      checkAuthentication(this.props);
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.location !== this.props.location) {
        this.checkAuthentication(nextProps);
      }
    }
    render() {
      return <BaseComponent {...this.props} />;
    }
  }
  return withRouter(Restricted);
};
