import alt from '../alt';

class UsersActions {
  constructor() {
    this.generateActions(
      'getUsersSuccess',
      'getUsersFail',
      'removeUsersSuccess'
    );
  }

  getUsers() {
    $.ajax({ url: '/api/users' })
      .done(data => {
        this.actions.getUsersSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.getUsersFail(jqXhr.responseJSON.message);
      });
  }

  updateUsers(data) {
    $.ajax({
      type: 'PUT',
      url: '/api/users' ,
      data: data
    })
      .done(() => {
      })
      .fail((jqXhr) => {
      });
  }

  removeUsers(data) {
    $.ajax({ url: '/api/users/' + data._id })
      .done((data) => {
        this.actions.removeUsersSuccess(data);
      })
      .fail((jqXhr) => {
      });
  }
}

export default alt.createActions(UsersActions);