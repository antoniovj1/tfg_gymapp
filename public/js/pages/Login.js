import React from "react";
import { connect } from "react-redux"
import { Link, Router } from 'react-router'
import { browserHistory } from 'react-router'


import { loginUser } from "../actions/loginActions"

@connect((store) => {
  return {
    login: store.login,
  };
})

export default class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { username: '', password: '' };
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }
  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    var uname = this.state.username;
    var passw = this.state.password;
    var user = { username: uname, password: passw };
    this.props.dispatch(loginUser(user));
  }

  render() {
    const {login} = this.props;

    return (
      <div class="container">
        <div class="row">
          <div class="col-md-offset-5 col-md-3">
            <div class="form-login">
              <h3>Login</h3>
              <input type="text"
                ref="userName"
                class="form-control input-sm chat-input"
                placeholder="username"
                value={this.state.username}
                onChange={this.handleChangeUsername} />

              <br></br>

              <input type="password"
                ref="userPassword"
                class="form-control input-sm chat-input"
                placeholder="password"
                value={this.state.password}
                onChange={this.handleChangePassword} />

              <br></br>
              <div class="wrapper">
                <span class="group-btn">
                  <a href="/" onClick={this.handleSubmit} class="btn btn-primary btn-md">Login <i class="fa fa-sign-in"></i></a>
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
