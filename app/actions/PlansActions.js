import alt from '../alt';

class PlansActions {
  constructor() {
    this.generateActions(
      'getPlansSuccess',
      'getPlansFail',
      'updatePlanFail'
    );
  }

  getPlans() {
    $.ajax({ url: '/api/plans' })
      .done(data => {
        this.actions.getPlansSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.getPlansFail(jqXhr.responseJSON.message);
      });
  }

  updatePlans(data) {
    $.ajax({
      type: 'PUT',
      url: '/api/Plans' ,
      data: data
    })
      .done(() => {
      })
      .fail((jqXhr) => {
        this.actions.updatePlanFail(jqXhr.responseJSON.message);
      });
  }

  removePlans(data) {
    $.ajax({ url: '/api/Plans/' + data._id })
      .done((data) => {
      })
      .fail((jqXhr) => {
      });
  }
}

export default alt.createActions(PlansActions);