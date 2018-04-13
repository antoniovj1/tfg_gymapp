import React from 'react';
import { connect } from 'react-redux';
import UserLeft from '../components/profile/UserLeft';
import { fetchActualUser } from '../redux/actions/userActions';

const mapStateToProps = store => ({ user: store.user.user });
const mapDispatchToProps = dispatch => ({
  fetchActualUser: () => {
    dispatch(fetchActualUser());
  }
});
class Session extends React.Component {
  componentWillMount() {
    this.props.fetchActualUser();
  }

  render() {
    if (Array.isArray(this.props.user)) {
      return null;
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Session);
