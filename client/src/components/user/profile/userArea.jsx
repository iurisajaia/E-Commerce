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
    // console.log(this.context.state.user)
    this.setState({
      firstname: this.context.state.user.firstname,
      lastname: this.context.state.user.lastname,
      username: this.context.state.user.username,
      email: this.context.state.user.email,
      id: this.context.state.user._id,
      city: this.context.state.user.city,
      adress: this.context.state.user.adress,
      phone: this.context.state.user.phone,
      zip: this.context.state.user.zip
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
        if (res.token) {
          localStorage.setItem("token", res.token);
        }
        if (res.passwordchanged) {
          localStorage.clear();
          setInterval((window.location = "/login"), 2000);
        }
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
        if (res.token) {
          localStorage.setItem("token", res.token);
        }
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
    console.log(this.context, "userarea");
    return (
      <MyContext.Consumer>
        {context => (
          <>
            <div className="container bootstrap snippet">
              <div className="row">
                <div className="col-sm-3">
                  <div className="text-center">
                    <img
                      src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
                      className="avatar img-circle img-thumbnail"
                      alt="avatar"
                    />
                  </div>
                  <hr />
                  <br />

                  <ul className="list-group">
                    <li className="list-group-item text-muted">
                      Activity <i className="fa fa-dashboard fa-1x" />
                    </li>
                    <li className="list-group-item">
                      <span className="pull-left">
                        <strong>Delivered Orders</strong>
                      </span>{" "}
                      {context.state.user.products ? (
                        <>{context.state.user.products.length}</>
                      ) : null}
                    </li>
                    <li className="list-group-item">
                      <span className="pull-left">
                        <strong>Items In Cart</strong>
                      </span>{" "}
                      {context.state.carts ? (
                        <>{context.state.carts.length}</>
                      ) : null}
                    </li>
                  </ul>
                </div>
                <div className="col-sm-9">
                  <ul className="nav nav-tabs">
                    <li className="">
                      <a data-toggle="tab" href="#information">
                        User Information
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href="#shipping">
                        User Shipping
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href="#products">
                        Products
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href="#messages">
                        Messages
                      </a>
                    </li>
                  </ul>

                  <div className="tab-content">
                    <div className="tab-pane active" id="information">
                      <hr />
                      <form className="form row" onSubmit={this.updateUser}>
                        <div className="form-group col-md-6">
                          <div className="col-xs-6">
                            <label htmlFor="first_name">
                              <h4>First name</h4>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="first_name"
                              value={this.state.firstname}
                              onChange={this.changeUserName.bind(this)}
                            />
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="col-xs-6">
                            <label htmlFor="last_name">
                              <h4>Last name</h4>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="last_name"
                              value={this.state.lastname}
                              onChange={this.changeUserLastName.bind(this)}
                            />
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="col-xs-6">
                            <label htmlFor="user_name">
                              <h4>Username</h4>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="user_name"
                              value={this.state.username}
                              onChange={this.changeUserUserName.bind(this)}
                            />
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="col-xs-6">
                            <label htmlFor="email">
                              <h4>Email</h4>
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              value={this.state.email}
                              onChange={this.changeUserEmail.bind(this)}
                            />
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="col-xs-6">
                            <label htmlFor="old_password">
                              <h4>Old Password</h4>
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="old_password"
                              value={this.state.oldpassword}
                              placeholder="old password"
                              onChange={this.changeUserOldPass.bind(this)}
                            />
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="col-xs-6">
                            <label htmlFor="new_password">
                              <h4>New Password</h4>
                            </label>
                            <input
                              type="password"
                              id="new_password"
                              className="form-control"
                              value={this.state.newpassword}
                              placeholder="new password"
                              onChange={this.changeUserNewPass.bind(this)}
                            />
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="col-xs-12">
                            <br />
                            <button
                              className="btn btn-lg btn-success"
                              type="submit"
                            >
                              <i className="glyphicon glyphicon-ok-sign" />{" "}
                              Update
                            </button>
                          </div>
                        </div>
                      </form>
                      <hr />
                    </div>
                    <div className="tab-pane" id="shipping">
                      <h2 />

                      <hr />
                      <form className="form row" onSubmit={this.updateInfo}>
                        <div className="form-group col-md-6">
                          <div className="col-xs-6">
                            <label htmlFor="city">
                              <h4>City</h4>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="city"
                              placeholder="city"
                              value={this.state.city}
                              onChange={this.changeUserCity.bind(this)}
                            />
                          </div>
                        </div>

                        <div className="form-group col-md-6">
                          <div className="col-xs-6">
                            <label htmlFor="adress">
                              <h4>Adress</h4>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="adress"
                              placeholder="adress"
                              value={this.state.adress}
                              onChange={this.changeUserAdress.bind(this)}
                            />
                          </div>
                        </div>

                        <div className="form-group col-md-6">
                          <div className="col-xs-6">
                            <label htmlFor="zip">
                              <h4>Zip</h4>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="zip"
                              value={this.state.zip}
                              placeholder="zip code"
                              onChange={this.changeUserZip.bind(this)}
                            />
                          </div>
                        </div>

                        <div className="form-group col-md-6">
                          <div className="col-xs-6">
                            <label htmlFor="phone">
                              <h4>Phone</h4>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="phone"
                              placeholder="phone number"
                              value={this.state.phone}
                              onChange={this.changeUserPhone.bind(this)}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="col-xs-12">
                            <br />
                            <button
                              className="btn btn-lg btn-success"
                              type="submit"
                            >
                              <i className="glyphicon glyphicon-ok-sign" />{" "}
                              Update
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="tab-pane" id="products">
                      <hr />
                      {context.state.user.products ? (
                        <>
                          <div className="mb-5">
                            {context.state.user.products.map(products => {
                              return (
                                <ul key={products.products} className="mb-5">
                                  {products.map(prod => {
                                    return (
                                      <li key={prod.prod}>{prod.title}</li>
                                    );
                                  })}
                                </ul>
                              );
                            })}
                          </div>
                        </>
                      ) : null}
                    </div>
                    <div className="tab-pane" id="messages">
                      <h1>User Messages</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </MyContext.Consumer>
    );
  }
}

export default UserArea;
