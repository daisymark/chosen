import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Register from './components/Register';
import Users from './components/Users';
import Login from './components/Login';
import Plans from './components/Plans';
import AddPlan from './components/AddPlan'

export default (
  <Route component={App}>
    <Route path='/' component={Users} />
    <Route path='/login' component={Login} />
    <Route path='/Plans' component={Plans} />
    <Route path='/addplan' component={AddPlan} />
    <Route path='/users' component={Users} />
    <Route path='/register' component={Register} />
  </Route>
);
