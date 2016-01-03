import alt from '../alt';

class AddUserActions {
  constructor() {
    this.generateActions(
      'addUserSuccess',
      'addUserFail',
      'updateName',
      'updatePassdword'
    )
  }

  addUser(name,passdword) {
    $.ajax({
      type: 'post',
      url: '/api/users',
      data: { 
        name: name,
        passdword: passdword
      }
    })
      .done((data) => {
        this.actions.addUserSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.addUserFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(AddUserActions);