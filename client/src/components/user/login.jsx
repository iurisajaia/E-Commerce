import React, { Component } from "react";

class Login extends Component {
  state = {};
  hanldeFormSubmit = event => {
    event.preventDefault();
    const data = {
      email: event.target.email.value,
      password: event.target.password.value
    };

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
        if (token.error) {
          this.setState({ error: token.error });
        } else {
          this.setState({ error: false, success: "Success" });
          localStorage.setItem("token", token.token);
          setInterval((window.location = "/products"), 2000);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  render() {
    var error;
    if (this.state.error) {
      error = this.state.error;
    }

    var success;
    if (this.state.success) {
      success = this.state.success;
    }
    return (
      <>
        <form className="login-form mt-5" onSubmit={this.hanldeFormSubmit}>
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
          <button type="submit" className="btn btn-block btn-info">
            Log In
          </button>
        </form>

        <div className="login-form mt-2">
          {error && (
            <>
              <p className="alert alert-danger">{error}</p>
            </>
          )}

          {success && (
            <>
              <p className="alert alert-success">{success}</p>
            </>
          )}
        </div>
      </>
    );
  }
}

export default Login;
