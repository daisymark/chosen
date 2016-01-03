import React from 'react';
import {Link} from 'react-router';
import PlansStore from '../stores/PlansStore'
import PlansActions from '../actions/PlansActions';

class Plans extends React.Component {
  constructor(props) {
    super(props);
    this.state = PlansStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    PlansStore.listen(this.onChange);
    PlansActions.getPlans();
  }

  componentWillUnmount() {
    PlansStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleChangeName(event) {
    this.state.changePlan.name = event.target.value;
    this.setState({changePlan: this.state.changePlan});
  }

  handleChangecontent(event) {
    this.state.changePlan.content = event.target.value;
    this.setState({changePlan: this.state.changePlan});
  }

  handleDelClick(Plan) {
    PlansActions.removePlans(Plan);
    this.setState(PlansStore.getState());
  }

  handleChangeClick(Plan) {
    this.setState({changePlan: Plan});
  }

  handleUpadateClick(){
    event.preventDefault();

    var name = this.state.changePlan.name.trim() ,
        content = this.state.changePlan.content.trim();

    if (name&&content) {
      PlansActions.updatePlans(this.state.changePlan);
    }
  }
  render() {
    var PlanNodes = this.state.Plans.map((Plan, index) => {
      return (
        <tr>
          <td>{Plan.name}</td>
          <td>{Plan.content}</td>
          <td>
            <a className="btn btn-default" onClick={this.handleDelClick.bind(this, Plan)}>
            删除
            </a>
            <a className="btn btn-default" onClick={this.handleChangeClick.bind(this, Plan)} data-toggle="modal" data-target="#changePlans">
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
                  <th>content</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
              {PlanNodes}
              </tbody>
            </table>
        </div>
        <div className="modal fade" id="changePlans" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">用户信息修改</h4>
              </div>
              <form onSubmit={this.handleUpadateClick.bind(this)}>
                <div className="modal-body">
                    <div className={'form-group '}>
                      <label className='control-label'>Plan Name</label>
                      <input type='text' className='form-control'  value={this.state.changePlan.name} ref='nameTextField' onChange={this.handleChangeName.bind(this)} autoFocus/>
                      <label className='control-label'>content</label>
                      <input type='text' className='form-control'  value={this.state.changePlan.content} ref='contentTextField' onChange={this.handleChangecontent.bind(this)} autoFocus/>
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

export default Plans;