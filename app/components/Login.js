import React from 'react';
import {Link} from 'react-router';
import LoginStore from '../stores/LoginStore';
import LoginActions from '../actions/LoginActions';

class AddUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = LoginStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    LoginStore.listen(this.onChange);
  }

  componentWillUnmount() {
    LoginStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    var name = this.state.name.trim() ,
        passdword = this.state.passdword.trim();

    if (name&&passdword) {
      LoginActions.Login(name,passdword);
    }
  }
  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>登录</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className={'form-group '}>
                    <label className='control-label'>User Name</label>
                    <input type='text' className='form-control' value={this.state.name} onChange={LoginActions.updateName}
                    ref='nameTextField' autoFocus/>
                    <label className='control-label'>PassdWord</label>
                    <input type='text' className='form-control' value={this.state.passdword} onChange={LoginActions.updatePassdword}
                    ref='passdwordTextField'/>
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