import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/user/login";
import Registration from "./components/user/registration";
import Home from "./components/home";
import Details from "./components/details";
import jwt_decode from "jwt-decode";

class App extends Component {
  state = {
    active: false
  };
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      var decoded = jwt_decode(token);
      this.setState({ decoded, active: true });
    }
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <br />
          <br />
          <br />
          <br />
          <Switch>
            <Route exact path="/registration" component={Registration} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Home} />
            <Route exact path="/details/:id" component={Details} />
            {/* <Route exact path='/:id'/> */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
