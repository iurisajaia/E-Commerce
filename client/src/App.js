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
import ShopCart from "./components/cart/shopCart";
import Compare from "./components/compare";
import Categories from "./components/products/categories";
import MyProvider from "./State";
import Checkout from "./components/cart/checkout";
import Orders from "./components/cart/orders";

class App extends Component {
  state = {};

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <MyProvider>
            <Navbar />
            <div className="pt50" />
            <Switch>
              <Route exact path="/registration" component={Registration} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/compare" component={Compare} />
              <Home exact path="/" />

              <Products path="/products" />

              <ShopCart exact path="/cart" />
              <Details exact path="/details/:id" />
              <Categories exact path="/cat/:id" />
              <Profile exact path="/me" />
              <Checkout exact path="/checkout" />
              <Orders exact path="/orders" />
            </Switch>
          </MyProvider>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
