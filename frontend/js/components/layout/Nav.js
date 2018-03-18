import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import { browserHistory } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import * as AuthService from "../../utils/AuthService";
import LoginButton from "../LoginButton";
import { authActions } from "../../redux/reducers/authReducer";
import MenuLateral from "./MenuLateral";

const mapDispatchToProps = dispatch => ({
  loginSuccess: profile => dispatch(authActions.loginSuccess(profile)),
  loginError: error => dispatch(authActions.loginError(error))
});

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  }
};

class Nav extends React.Component {
  componentWillMount() {
    const { loginError, loginSuccess } = this.props;
    // Add callback for lock's `authenticated` event
    AuthService.lock.on("authenticated", authResult => {
      AuthService.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          return loginError(error);
        }
        AuthService.setToken(authResult.idToken); // static method
        AuthService.setProfile(profile); // static method
        loginSuccess(profile);
        browserHistory.push({ pathname: "/" });
        AuthService.lock.hide();
      });
    });
    // Add callback for lock's `authorization_error` event
    AuthService.lock.on("authorization_error", error => {
      loginError(error);
      browserHistory.push({ pathname: "/" });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <MenuLateral />
            <Typography variant="title" color="inherit" className={classes.flex}>
              Training App
            </Typography>
            <LoginButton authService={this.authService} />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

/* eslint react/forbid-prop-types: 0 */
Nav.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
  loginError: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Nav));
