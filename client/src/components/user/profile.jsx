import React, { Component } from "react";
// import axios from "axios";
// import UserCard from "./usercard";
import Products from "./admin/products";
import Categories from "./admin/categories";
import UserArea from "./profile/userArea";
import ProfileNav from "./profileNav";
import Users from "./admin/users";
import Companies from "./admin/companies";
import Messages from "./admin/messages";
import { MyContext } from "../../State";

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

  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <>
            <div className="container mt-5">
              {context.state.user && !context.state.admin && <UserArea />}
              {!context.state.user && <> You are not logged in</>}
              {context.state.admin && (
                <>
                  <ProfileNav />
                  <div className="tab-content active">
                    <Users />
                    <Products />
                    <Categories />
                    <Companies />
                    <Messages />
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Profile;
