import React, { PropTypes as T } from 'react'
import { ButtonToolbar, Button } from 'react-bootstrap'

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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.dispatch(loginUser());
  }

  render() {
    const { auth } = this.props
    return (
      <div>
        <div class="form-group">
          <label class="col-md-4 control-label" for="singlebutton"></label>
          <div class="col-md-4 center-block">
            <button onClick={this.handleSubmit} id="singlebutton" name="singlebutton" class="btn btn-primary center-block">
              Login
            </button>
          </div>
        </div>
      </div>
    )
  }
}
