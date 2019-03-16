import React, { Component } from "react";
import UserCard from "../usercard";
class Users extends Component {
  state = {};
  render() {
    var admin;
    if (this.props.admin) {
      admin = this.props.admin;
    }
    return (
      <div id="home" className="tab-pane fade in active show">
        <div className="row">
          {admin.map(users => {
            return <UserCard key={users._id} user={users} />;
          })}
        </div>
      </div>
    );
  }
}

export default Users;
