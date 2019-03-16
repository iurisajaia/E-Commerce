import React, { Component } from "react";

class UserArea extends Component {
  state = {};
  render() {
    const user = this.props.user;
    // cthis.props.user);
    return (
      <>
        <ul className="list-group">
          <li className="list-group-item">{user.firstname}</li>
          <li className="list-group-item"> {user.lastname}</li>
          <li className="list-group-item">{user.username}</li>
          <li className="list-group-item">{user.email}</li>
        </ul>
        <br />
        {/* <h4>Send Message To Admin</h4> */}
        {/* <form onSubmit={this.sendMessage} className="form-group">
              <textarea id="message" className="form-control" />
              <input type="hidden" value={user._id} id="hidden" />
              <button type="submit">Send</button>
            </form> */}
        {/* } */}
      </>
    );
  }
}

export default UserArea;
