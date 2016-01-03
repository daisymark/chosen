import React from 'react';
import AddPlanStore from '../stores/AddPlanStore';
import AddPlanActions from '../actions/AddPlanActions';

class AddPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = AddPlanStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AddPlanStore.listen(this.onChange);
  }

  componentWillUnmount() {
    AddPlanStore.unlisten(this.onChange);
  }

  onChange(state) {
      this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    var name = this.state.name.trim() ,
        content = this.state.content.trim();

    if (name&&content) {
      AddPlanActions.addPlan(name,content);
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Add Plan</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className={'form-group '}>
                    <label className='control-label'>Plan Name</label>
                    <input type='text' className='form-control'  value={this.state.name} 
                    onChange={AddPlanActions.updateName} ref='nameTextField' autoFocus/>
                    <label className='control-label'>Plan Content</label>
                    <textarea type='text' className='form-control'  value={this.state.content} 
                    onChange={AddPlanActions.updateContent} ref='contentTextField'/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>
                  <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddPlan;