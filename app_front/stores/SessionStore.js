import alt from '../alt';
import SessionActions from '../actions/SessionActions';

class SessionStore {
  constructor() {
    this.bindActions(SessionActions);
    this.sessions = [];
  }

  onGetSessionsSuccess(data) {
    this.sessions = data.slice(0, 5);
  }

  onGetSessionsFail(jqXhr) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }
}

export default alt.createStore(SessionStore);
