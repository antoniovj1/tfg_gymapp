import React from "react";
import { IndexLink, Link } from "react-router";
import { connect } from "react-redux"

import { logoutUser } from "../../actions/loginActions"

@connect((store) => {
  return {
    login: store.login,
  };
})


export default class Nav extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {collapsed: true};
    this.logOut = this.logOut.bind(this);
  }

  logOut(event) {
    this.props.dispatch(logoutUser());
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;

    const navClass = collapsed ? "collapse" : "";

    return (
      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <a class="navbar-brand" href="/">IV UGR</a>
            <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li>
                <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Home</IndexLink>
              </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li>
                <IndexLink to="/login" onClick={this.logOut}>LogOut</IndexLink>
              </li>
              <li>
                <IndexLink to="/profile" onClick={this.toggleCollapse.bind(this)}>Perfil</IndexLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
