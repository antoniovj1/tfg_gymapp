import React from "react";
import {connect} from "react-redux"
import AppBar from 'material-ui/AppBar';
import { browserHistory }  from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import * as AuthService from '../../utils/AuthService';
import {logoutUser} from "../../redux/actions/loginActions"
import LoginButton from "../LoginButton"
import PropTypes from 'prop-types';

import {authActions} from '../../redux/reducers/authReducer';
import MenuLateral from './MenuLateral';

const mapDispatchToProps = dispatch => ({
    loginSuccess: profile => dispatch(authActions.loginSuccess(profile)),
    loginError: error => dispatch(authActions.loginError(error)),
});


class Nav extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

    componentWillMount() {
      const { loginError, loginSuccess } = this.props;
      // Add callback for lock's `authenticated` event
      AuthService.lock.on('authenticated', authResult => {
        AuthService.lock.getUserInfo(authResult.accessToken, (error, profile) => {
          if (error) {
            return loginError(error);
          }
          AuthService.setToken(authResult.idToken); // static method
          AuthService.setProfile(profile); // static method
          loginSuccess(profile);
          browserHistory.push({ pathname: '/' });
          AuthService.lock.hide();
        });
      });
      // Add callback for lock's `authorization_error` event
      AuthService.lock.on('authorization_error', error => {
        loginError(error);
        browserHistory.push({ pathname: '/' });
      });
    }

  render() {
    const {dispatch,login} = this.props;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>        
  
      <AppBar
        title="Training App"
        iconElementLeft={<MenuLateral />}
        iconElementRight={<LoginButton authService={this.authService} />}
         />
      </MuiThemeProvider>        
    );
  }
}

Nav.propTypes = {

    loginSuccess: PropTypes.func.isRequired,
    loginError: PropTypes.func.isRequired,
};

export default connect(
    null,
    mapDispatchToProps,
)(Nav);