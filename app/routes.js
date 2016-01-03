import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Stats from './components/Stats';
import Character from './components/Character';
import CharacterList from './components/CharacterList';
import AddCharacter from './components/AddCharacter';
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
    <Route path='/stats' component={Stats} />
    <Route path='/characters/:id' component={Character} />
    <Route path='/add' component={AddCharacter} />
    <Route path='/register' component={Register} />
    <Route path=':category' component={CharacterList}>
      <Route path=':race' component={CharacterList}>
        <Route path=':bloodline' component={CharacterList} />
      </Route>
    </Route>
  </Route>
);
