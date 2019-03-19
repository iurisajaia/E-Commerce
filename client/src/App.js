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
import Cart from "./components/Cart";
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
    // console.log(this.state);
    var user;

    if (this.state.decoded) {
      user = this.state.decoded;
    }
    var companies = this.state.companies;
    var products = this.state.products;
    var categories = this.state.categories;

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
            <Route exact path="/cart" component={Cart} />
            <Products
              exact
              path="/products"
              companies={companies}
              categories={categories}
              products={products}
            />
            <Details exact path="/details/:id" companies={companies} />
            <Profile
              exact
              path="/me"
              user={user}
              products={products}
              companies={companies}
              categories={categories}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
