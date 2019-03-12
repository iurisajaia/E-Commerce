import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import RegUser from './components/RegUser';
import AdRegister from './components/AdRegister'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/user' component={RegUser} />
          <Route exact path='/admin' component={AdRegister} />
        </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
