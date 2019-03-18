import React, { Component } from "react";
import axios from "axios";
// import UserCard from "./usercard";
import Products from "./admin/products";
import Categories from "./admin/categories";
import UserArea from "./profile/userArea";
import ProfileNav from "./profileNav";
import Users from "./admin/users";
import Companies from "./admin/companies";
class Profile extends Component {
  state = {};

  sendMessage = event => {
    event.preventDefault();
    const data = {
      message: event.target.message.value,
      user: event.target.hidden.value
    };

    // console.log(data);

    fetch("http://localhost:5000/message/:id", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/me", {
          headers: {
            "x-auth-token": token
          }
        })
        .then(res => {
          this.setState({ user: res.data.user, alluser: res.data.alluser });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  render() {
    var products;
    if (this.props.products) {
      products = this.props.products;
    }
    var companies;
    if (this.props.companies) {
      companies = this.props.companies;
    }
    var categories;
    if (this.props.categories) {
      categories = this.props.categories;
    }
    var user;
    if (this.state.user) {
      user = this.state.user;
    }

    var admin;
    if (this.state.alluser) {
      admin = this.state.alluser;
    }
    return (
      <div className="container mt-5">
        {user && !admin && <UserArea user={user} />}
        {!user && <> You are not logged in</>}
        {admin && (
          <>
            <ProfileNav />
            <div className="tab-content active">
              <Users admin={admin} />
              <Products
                products={products}
                companies={companies}
                categories={categories}
              />
              <Categories categories={categories} />
              <Companies companies={companies} />
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Profile;
