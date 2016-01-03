import alt from '../alt';
import AddUserActions from '../actions/AddUserActions';

class AddUserStore {
  constructor() {
    this.bindActions(AddUserActions);
    this.name = '';
    this.passdword = '';
    this.helpBlock = '';
  }

  onAddUserSuccess(successMessage) {
    this.helpBlock = successMessage;
  }

  onAddUserFail(errorMessage) {
    this.helpBlock = errorMessage;
  }

  onUpdateName(event) {
    this.name = event.target.value;
  }

  onUpdatePassdword(event) {
    this.passdword = event.target.value;
  }
  
}

export default alt.createStore(AddUserStore);