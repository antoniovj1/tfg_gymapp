import alt from '../alt';

class SessionActions {
  constructor() {
    this.generateActions(
      'getSessionsSuccess',
      'getSessionsFail'
    );
  }

  getSessions() {
    $.ajax({ url: '/api/characters/top' })
      .done((data) => {
        this.actions.getTopCharactersSuccess(data)
      })
      .fail((jqXhr) => {
        this.actions.getTopCharactersFail(jqXhr)
      });
  }
}

export default alt.createActions(SessionActions);
