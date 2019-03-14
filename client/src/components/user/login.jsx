import React, { Component } from "react";

class Login extends Component {
  state = {};
  hanldeFormSubmit = event => {
    event.preventDefault();
    const data = {
      email: event.target.email.value,
      password: event.target.password.value
    };

    // console.log(data);

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(token => {
        console.log(token);
        localStorage.setItem("token", token.token);
      })
      .catch(error => {
        console.error(error);
      });
  };
  render() {
    return (
      <form className="login-form" onSubmit={this.hanldeFormSubmit}>
        <div className="form-group ">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            id="password"
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
