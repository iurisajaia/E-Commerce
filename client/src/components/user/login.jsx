import React, { Component } from "react";

class Login extends Component {
  state = {};
  render() {
    return (
      <form className="login-form">
        <div className="form-group ">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-block btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default Login;
