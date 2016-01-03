import React from 'react';
import {Link} from 'react-router';
import UsersStore from '../stores/UsersStore'
import UsersActions from '../actions/UsersActions';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = UsersStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    UsersStore.listen(this.onChange);
    UsersActions.getUsers();
  }

  componentWillUnmount() {
    UsersStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleChangeName(event) {
    this.state.changeuser.name = event.target.value;
    this.setState({changeuser: this.state.changeuser});
  }

  handleChangePassdword(event) {
    this.state.changeuser.passdword = event.target.value;
    this.setState({changeuser: this.state.changeuser});
  }

  handleDelClick(user) {
    UsersActions.removeUsers(user);
  }

  handleChangeClick(user) {
    this.setState({changeuser: user});
  }

  handleUpadateClick(){
    event.preventDefault();

    var name = this.state.changeuser.name.trim() ,
        passdword = this.state.changeuser.passdword.trim();

    if (name&&passdword) {
      UsersActions.updateUsers(this.state.changeuser);

    }
  }
  render() {
    var userNodes = this.state.users.map((user, index) => {
      return (
        <tr>
          <td>{user.name}</td>
          <td>{user.passdword}</td>
          <td>
            <a className="btn btn-default" onClick={this.handleDelClick.bind(this, user)}>
            删除
            </a>
            <a className="btn btn-default" onClick={this.handleChangeClick.bind(this, user)} data-toggle="modal" data-target="#changeUsers">
            修改
            </a>
          </td>
        </tr>
      );
    });
    return (
      <div className='container'>
        <div className='panel panel-default'>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>name</th>
                  <th>passdword</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
              {userNodes}
              </tbody>
            </table>
        </div>
        <div className="modal fade" id="changeUsers" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">用户信息修改</h4>
              </div>
              <form onSubmit={this.handleUpadateClick.bind(this)}>
                <div className="modal-body">
                    <div className={'form-group '}>
                      <label className='control-label'>User Name</label>
                      <input type='text' className='form-control'  value={this.state.changeuser.name} ref='nameTextField' onChange={this.handleChangeName.bind(this)} autoFocus/>
                      <label className='control-label'>PassdWord</label>
                      <input type='text' className='form-control'  value={this.state.changeuser.passdword} ref='passdwordTextField' onChange={this.handleChangePassdword.bind(this)} autoFocus/>
                    </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary">Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Users;