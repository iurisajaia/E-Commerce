import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/user/login";
import Registration from "./components/user/registration";
import Home from "./components/home";
import Products from "./components/products/products";
import Details from "./components/products/details";
import Profile from "./components/user/profile";
import jwt_decode from "jwt-decode";
// import { decode } from "punycode";

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
    var user;

    if (this.state.decoded) {
      user = this.state.decoded;
    }

    return (
      <BrowserRouter>
        <div className="App">
          <Navbar user={user} />
          <br />
          <br />
          <br />
          <br />
          <Switch>
            <Route exact path="/registration" component={Registration} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Home} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/details/:id" component={Details} />
            <Route exact path="/me" component={Profile} user={user} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
