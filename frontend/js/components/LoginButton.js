import React from "react";
import Button from "material-ui/Button";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { authActions } from "../redux/reducers/authReducer";
import * as AuthService from "../utils/AuthService";

const mapStateToProps = state => ({
  auth: state.login
});

const mapDispatchToProps = dispatch => ({
  loginRequest: () => dispatch(authActions.loginRequest()),
  logoutSuccess: () => dispatch(authActions.logoutSuccess())
});

const LoginButton = ({ authService, auth, loginRequest, logoutSuccess }) => (
  <div>
    {auth.isAuthenticated ? (
      <Link to="/login">
        <Button
          variant="raised"
          onClick={() => {
            logoutSuccess();
            AuthService.logout(); // careful, this is a static method
          }}
        >
          Logout
        </Button>
      </Link>
    ) : (
      <Button
        variant="raised"
        onClick={() => {
          AuthService.login();
          loginRequest();
        }}
      >
        Login
      </Button>
    )}
    {auth.error && <p>{auth.error}</p>}
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
