import alt from '../alt';
import {assign} from 'underscore';

class NavbarActions {
  constructor() {
    this.generateActions(
      'updateOnlineUsers'
    );
  }

}

export default alt.createActions(NavbarActions);
