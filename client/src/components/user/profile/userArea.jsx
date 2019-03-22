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
    id: "",
    city: "",
    adress: "",
    zip: "",
    phone: ""
  };
  componentDidMount() {
    console.log(this.context.state.user)
    this.setState({
      firstname: this.context.state.user.firstname,
      lastname: this.context.state.user.lastname,
      username: this.context.state.user.username,
      email: this.context.state.user.email,
      id: this.context.state.user._id
    });
  }

  // Update User
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

  // Update Info
  updateInfo = e => {
    e.preventDefault();
    const data = {
      city: this.state.city,
      adress: this.state.adress,
      zip: this.state.zip,
      phone: this.state.phone,
      id: this.state.id
    };
    fetch("http://localhost:5000/update-info", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        if (res.adressInfo) {
          this.setState({
            phone: res.adressInfo.phone,
            adress: res.adressInfo.adress,
            zip: res.adressInfo.zip,
            city: res.adressInfo.city
          });
        }

        console.log(res);
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
  changeUserCity = e => {
    this.setState({ city: e.target.value });
  };
  changeUserAdress = e => {
    this.setState({ adress: e.target.value });
  };
  changeUserZip = e => {
    this.setState({ zip: e.target.value });
  };
  changeUserPhone = e => {
    this.setState({ phone: e.target.value });
  };

  render() {
    console.log(this.state, "userarea");
    return (
      <MyContext.Consumer>
        {context => (
          <>
            <div className="row">
              <form onSubmit={this.updateUser} className="col-md-6 form-group">
                <input
                  className="form-control"
                  type="text"
                  value={this.state.firstname}
                  onChange={this.changeUserName.bind(this)}
                />
                <input
                  className="form-control"
                  type="text"
                  value={this.state.lastname}
                  onChange={this.changeUserLastName.bind(this)}
                />
                <input
                  className="form-control"
                  type="text"
                  value={this.state.username}
                  onChange={this.changeUserUserName.bind(this)}
                />
                <input
                  className="form-control"
                  type="email"
                  value={this.state.email}
                  onChange={this.changeUserEmail.bind(this)}
                />
                <input
                  className="form-control"
                  type="password"
                  value={this.state.oldpassword}
                  placeholder="old password"
                  onChange={this.changeUserOldPass.bind(this)}
                />
                <input
                  className="form-control"
                  type="password"
                  value={this.state.newpassword}
                  placeholder="new password"
                  onChange={this.changeUserNewPass.bind(this)}
                />
                <br />
                <button type="submit" className="btn btn-success btn-block">
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

              <form className="col-md-6 form-group" onSubmit={this.updateInfo}>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  placeholder="city"
                  onChange={this.changeUserCity.bind(this)}
                />
                <input
                  type="text"
                  className="form-control"
                  id="adress"
                  placeholder="adress"
                  onChange={this.changeUserAdress.bind(this)}
                />
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  placeholder="zip code"
                  onChange={this.changeUserZip.bind(this)}
                />
                <input
                  type="number"
                  className="form-control"
                  id="phone"
                  placeholder="phone number"
                  onChange={this.changeUserPhone.bind(this)}
                />
                <button type="submit" className="btn btn-success btn-block">
                  Update Info
                </button>
              </form>
            </div>

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
