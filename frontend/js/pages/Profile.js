import React from "react";
import UserLeft from "../components/profile/UserLeft";
import { connect } from "react-redux";

import { fetchActualUser } from "../redux/actions/userActions";

@connect(store => ({
  user: store.user.user
}))
export default class Session extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchActualUser());
  }

  render() {
    const { user } = this.props;

    return (
      <div className="container">
        <div className="row  text-center">
          <div className="col-md-3">
            <UserLeft user={this.props.user} />
          </div>
          <div className="col-md-9" />
        </div>
      </div>
    );
  }
}
