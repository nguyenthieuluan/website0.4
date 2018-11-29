import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import './App.css';
import Admin from './components/admin/Admin';
import SignIn from './components/auth/SignIn';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Dashboard}/>
            <Route path='/admin' component={Admin}/>
            <Route path='/signin' component={SignIn}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
