import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {connect} from 'react-redux';

import {authActions} from '../redux/reducers/authReducer';
import React from 'react';
import PropTypes from 'prop-types';

import AuthService from '../utils/AuthService';
import { Link } from "react-router";


const mapStateToProps = state => ({
  auth: state.login,
});

const mapDispatchToProps = dispatch => ({
  loginRequest: () => dispatch(authActions.loginRequest()),
  logoutSuccess: () => dispatch(authActions.logoutSuccess()),
});

const LoginButton = ({ authService, auth, loginRequest, logoutSuccess }) =>(
<div>
  {auth.isAuthenticated ?
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Link to="/login">
      <RaisedButton
          onClick={() => {
          logoutSuccess();
          AuthService.logout(); // careful, this is a static method
        }}
      
        label='Logout'
      />
      </Link>
      </MuiThemeProvider>        

    :

    <MuiThemeProvider muiTheme={getMuiTheme()}>        
    <RaisedButton
        onClick={() => {
        authService.login();
        loginRequest();
      }}
    
      label='Login'
    />
   </MuiThemeProvider>        

  }
  {auth.error &&
    <p>{auth.error}</p>
  }
</div>);

LoginButton.propTypes = {
authService: PropTypes.object.isRequired, // eslint-disable-line
auth: PropTypes.shape({
  isAuthenticated: PropTypes.bool.isRequired,
  profile: PropTypes.object,
  error: PropTypes.string,
}).isRequired,
loginRequest: PropTypes.func.isRequired,
logoutSuccess: PropTypes.func.isRequired,
};



export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginButton);

