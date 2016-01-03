import alt from '../alt';
import LoginActions from '../actions/LoginActions';

class LoginStore {
  constructor() {
    this.bindActions(LoginActions);
    this.name = '';
    this.passdword = '';
    this.helpBlock = '';
  }

  onLoginSuccess() {
    $('.navbar-login').hide();
    $('.userName').html(this.name);
    $('.navbar-user').show();
  }

  onLoginFail(errorMessage) {
    this.helpBlock = errorMessage;
  }

  onUpdateName(event) {
    this.name = event.target.value;
  }

  onUpdatePassdword(event) {
    this.passdword = event.target.value;
  }

}

export default alt.createStore(LoginStore);