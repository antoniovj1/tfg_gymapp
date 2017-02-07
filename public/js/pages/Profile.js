import React from "react";
import UserLeft from "../components/profile/UserLeft";
import { connect } from "react-redux"


import { fetchActualUser } from "../actions/userActions"

@connect((store) => {
  return {
    user: store.user.user,
  };
})

export default class Session extends React.Component {

  componentWillMount() {
      this.props.dispatch(fetchActualUser())
    }

  render() {
    const {user} = this.props;

    return (
      <div class="container">
          <div class="row  text-center">
            <div class="col-md-3">
              <UserLeft user={this.props.user}/>
      		  </div>
      		  <div class="col-md-9">
      		  </div>
          </div>
      </div>

    );
  }
}
