import React from 'react';
import PropTypes from 'prop-types';

import LoginButton from '../../components/LoginButton';
import AuthService from '../../utils/AuthService';
import {connect} from 'react-redux';

import {authActions} from '../../reducers/auth';
import Footer from "../../components/layout/Footer";
import Nav from "../../components/layout/Nav";

const mapDispatchToProps = dispatch => ({
  loginSuccess: profile => dispatch(authActions.loginSuccess(profile)),
  loginError: error => dispatch(authActions.loginError(error)),
});


class AppView extends React.Component {
  constructor() {
    super();
    this.authService = new AuthService();
  }

  componentWillMount() {
    // Add callback for lock's `authenticated` event
    this.authService.lock.on('authenticated', (authResult) => {
      this.authService.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) { return this.props.loginError(error); }
        AuthService.setToken(authResult.idToken); // static method
        AuthService.setProfile(profile); // static method
        this.props.loginSuccess(profile);
      });
    });
    // Add callback for lock's `authorization_error` event
    this.authService.lock.on('authorization_error', (error) => {
      this.props.loginError(error);
    });
  }

  render() {
      const { location } = this.props;
      const containerStyle = {
          marginTop: "60px"
      };
    return (
        <div>
            <Nav location={location} />
            <div class="container" style={containerStyle}>
                <div class="row">
                    <div class="col-lg-12">

                        {this.props.children}

                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
  }
}

AppView.propTypes = {

  loginSuccess: PropTypes.func.isRequired,
  loginError: PropTypes.func.isRequired,
};


export default connect(
  null, // no mapStateToProps
  mapDispatchToProps,
)(AppView);
