import React, { Component } from "react";
import UserCard from "../usercard";
import { MyContext } from "../../../State";
class Users extends Component {
  state = {};
  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <>
            <div id="home" className="tab-pane fade in active show">
              <div className="row">
                {context.state.admin.map(users => {
                  return <UserCard key={users._id} user={users} />;
                })}
              </div>
            </div>
          </>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Users;
