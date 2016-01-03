import alt from '../alt';
import AddPlanActions from '../actions/AddPlanActions';

class AddPlanStore {
  constructor() {
    this.bindActions(AddPlanActions);
    this.name = '';
    this.content = '';
    this.helpBlock = '';
  }

  onAddPlanSuccess(successMessage) {
    this.helpBlock = successMessage;
  }

  onAddPlanFail(errorMessage) {
    this.helpBlock = errorMessage;
  }

  onUpdateName(event) {
    this.name = event.target.value;
  }

  onUpdateContent(event) {
    this.content = event.target.value;
  }
}

export default alt.createStore(AddPlanStore);