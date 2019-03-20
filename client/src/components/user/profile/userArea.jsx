import React, { Component } from "react";

import { MyContext } from "../../../State";
class UserArea extends Component {
  static contextType = MyContext;

  state = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    oldpassword: "",
    newpassword: "",
    id: ""
  };
  componentDidMount() {
    this.setState({
      firstname: this.context.state.user.firstname,
      lastname: this.context.state.user.lastname,
      username: this.context.state.user.username,
      email: this.context.state.user.email,
      id: this.context.state.user._id
    });
  }

  updateUser = e => {
    e.preventDefault();
    const data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      username: this.state.username,
      email: this.state.email,
      oldpassword: this.state.oldpassword,
      newpassword: this.state.newpassword,
      id: this.state.id
    };
    fetch("http://localhost:5000/update-user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          this.setState({ error: res.error });
        } else {
          this.setState({ error: false, success: "Success" });
        }
        console.log(this.state);
      })
      .catch(error => {
        console.error(error);
      });
  };

  changeUserName = e => {
    this.setState({ firstname: e.target.value });
  };
  changeUserLastName = e => {
    this.setState({ lastname: e.target.value });
  };
  changeUserUserName = e => {
    this.setState({ username: e.target.value });
  };
  changeUserEmail = e => {
    this.setState({ email: e.target.value });
  };
  changeUserOldPass = e => {
    this.setState({ oldpassword: e.target.value });
  };
  changeUserNewPass = e => {
    this.setState({ newpassword: e.target.value });
  };

  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <>
            <form onSubmit={this.updateUser}>
              <input
                type="text"
                value={this.state.firstname}
                onChange={this.changeUserName.bind(this)}
              />
              <input
                type="text"
                value={this.state.lastname}
                onChange={this.changeUserLastName.bind(this)}
              />
              <input
                type="text"
                value={this.state.username}
                onChange={this.changeUserUserName.bind(this)}
              />
              <input
                type="email"
                value={this.state.email}
                onChange={this.changeUserEmail.bind(this)}
              />
              <input
                type="password"
                value={this.state.oldpassword}
                placeholder="old password"
                onChange={this.changeUserOldPass.bind(this)}
              />
              <input
                type="password"
                value={this.state.newpassword}
                placeholder="new password"
                onChange={this.changeUserNewPass.bind(this)}
              />
              <br />
              <button type="submit" className="btn btn-success">
                Update User
              </button>
              {this.state.error && (
                <>
                  <p className="alert alert-danger">{this.state.error}</p>
                </>
              )}
              {this.state.success && (
                <>
                  <p className="alert alert-success">{this.state.success}</p>
                </>
              )}
            </form>

            <ul className="list-group">
              <li className="list-group-item">
                {context.state.user.firstname}
              </li>
              <li className="list-group-item">
                {" "}
                {context.state.user.lastname}
              </li>
              <li className="list-group-item">{context.state.user.username}</li>
              <li className="list-group-item">{context.state.user.email}</li>
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
        )}
      </MyContext.Consumer>
    );
  }
}

export default UserArea;
