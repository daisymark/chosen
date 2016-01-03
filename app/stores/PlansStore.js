import alt from '../alt';
import PlansActions from '../actions/PlansActions';

class PlansStore {
  constructor() {
    this.bindActions(PlansActions);
    this.changePlan = {};
    this.Plans = [];
  }

  onGetPlansSuccess(data) {
    this.Plans = data;
  }

  onGetPlansFail(errorMessage) {
    toastr.eror(errorMessage);
  }

  onUpdatePlanFail(errorMessage) {
    alert(errorMessage);
  }

}

export default alt.createStore(PlansStore);