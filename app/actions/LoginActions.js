import alt from '../alt';

class LoginActions {
  constructor() {
    this.generateActions(
      'loginSuccess',
      'loginFail',
      'updateName',
      'updatePassdword'
    );
  }

  Login(name,passdword) {
    $.ajax({
      type: 'POST',
      url: '/api/users/' + name ,
      data: {
        name: name,
        passdword: passdword
      }
    })
      .done(() => {
        this.actions.loginSuccess()
      })
      .fail((jqXhr) => {
        this.actions.loginFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(LoginActions);