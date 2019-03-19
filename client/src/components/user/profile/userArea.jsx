import React, { Component } from "react";

class UserArea extends Component {
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
      firstname: this.props.user.firstname,
      lastname: this.props.user.lastname,
      username: this.props.user.username,
      email: this.props.user.email,
      id: this.props.user._id
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
    const user = this.props.user;

    return (
      <>
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
        </>
        {/* )} */}

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
