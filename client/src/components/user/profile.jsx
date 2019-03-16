import React, { Component } from "react";
import axios from "axios";
import UserCard from "./usercard";
class Profile extends Component {
  state = {};

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
    var user;
    if (this.state.user) {
      user = this.state.user;
    }

    var admin;
    if (this.state.alluser) {
      admin = this.state.alluser;
      console.log(admin);
    }
    return (
      <div className="container mt-5">
        {user && !admin && (
          <>
            <ul className="list-group">
              <li className="list-group-item">{user.firstname}</li>
              <li className="list-group-item"> {user.lastname}</li>
              <li className="list-group-item">{user.username}</li>
              <li className="list-group-item">{user.email}</li>
            </ul>
          </>
        )}
        {!user && <> You are not logged in</>}
        {admin && (
          <>
            <h1>All User</h1>
            <div className="row">
              {admin.map(users => {
                return <UserCard key={users._id} user={users} />;
              })}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Profile;
