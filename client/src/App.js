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

    Promise.all([
      fetch("http://localhost:5000/admin/companies"),
      fetch("http://localhost:5000/admin/categories"),
      fetch("http://localhost:5000/all-product")
    ])
      .then(([companies, categories, products]) => {
        return Promise.all([
          companies.json(),
          categories.json(),
          products.json()
        ]);
      })
      .then(([companies, categories, products]) => {
        this.setState({
          companies: companies.companies,
          categories: categories.categories,
          products
        });
      });
  }
  render() {
    var user;

    if (this.state.decoded) {
      user = this.state.decoded;
    }
    var companies = this.state.companies;

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
            <Products exact path="/products" companies={companies} />
            <Details exact path="/details/:id" companies={companies} />
            <Route exact path="/me" component={Profile} user={user} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
