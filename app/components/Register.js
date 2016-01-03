import React from 'react';
import AddUserStore from '../stores/AddUserStore';
import AddUserActions from '../actions/AddUserActions';

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = AddUserStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AddUserStore.listen(this.onChange);
  }

  componentWillUnmount() {
    AddUserStore.unlisten(this.onChange);
  }

  onChange(state) {
      this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    var name = this.state.name.trim() ,
        passdword = this.state.passdword.trim();

    if (name&&passdword) {
      AddUserActions.addUser(name,passdword);
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Add User</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className={'form-group '}>
                    <label className='control-label'>User Name</label>
                    <input type='text' className='form-control'  value={this.state.name} 
                    onChange={AddUserActions.updateName} ref='nameTextField' autoFocus/>
                    <label className='control-label'>PassdWord</label>
                    <input type='text' className='form-control'  value={this.state.passdword} 
                    onChange={AddUserActions.updatePassdword} ref='passdwordTextField'/>
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

export default AddUser;