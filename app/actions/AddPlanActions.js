import alt from '../alt';

class AddPlanActions {
  constructor() {
    this.generateActions(
      'addPlanSuccess',
      'addPlanFail',
      'updateName',
      'updateContent'
    )
  }

  addPlan(name,content) {
    $.ajax({
      type: 'post',
      url: '/api/plans',
      data: { 
        name: name,
        content: content
      }
    })
      .done((data) => {
        this.actions.addPlanSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.addPlanFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(AddPlanActions);