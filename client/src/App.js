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
import Cart from "./components/user/profile/cart";
import Compare from "./components/compare";
import Categories from "./components/products/categories";
import MyProvider from "./State";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <MyProvider>
            <Navbar />
            <div style={{ paddingTop: 50 }} />
            <Switch>
              <Route exact path="/registration" component={Registration} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/compare" component={Compare} />
              <Home exact path="/" />
              <Route path="/cart" component={Cart} />

              <Products path="/products" />

              <Details exact path="/details/:id" />
              <Categories exact path="/cat/:id" />
              <Profile exact path="/me" />
            </Switch>
          </MyProvider>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
