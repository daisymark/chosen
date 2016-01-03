import alt from '../alt';
import UsersActions from '../actions/UsersActions';

class UsersStore {
  constructor() {
    this.bindActions(UsersActions);
    this.changeuser = {};
    this.users = [];
  }

  onGetUsersSuccess(data) {
    this.users = data;
  }

  onGetUsersFail(errorMessage) {
    toastr.eror(errorMessage);
  }

  onRemoveUsersSuccess(data){
    this.users = UsersActions.getUsers()
  }

}

export default alt.createStore(UsersStore);