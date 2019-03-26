import React, { Component } from "react";

class Registration extends Component {
  state = {};

  hanldeFormSubmit = event => {
    event.preventDefault();
    const data = {
      firstname: event.target.firstname.value,
      lastname: event.target.lastname.value,
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value,
      repassword: event.target.repassword.value,
      day: event.target.day.value,
      month: event.target.month.value,
      year: event.target.year.value,
      gender: event.target.gender.value
    };

    // console.log(data);

    fetch("http://localhost:5000/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(user => {
        if (user.errors) {
          this.setState({ errors: user.errors });
        } else if (user.success) {
          this.setState({ success: user.success });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    var errors;
    var success;
    if (this.state.errors) {
      errors = this.state.errors;
    }
    if (this.state.success) {
      success = this.state.success;
    }
    return (
      <>
        <form className="container mt-5" onSubmit={this.hanldeFormSubmit}>
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="form-group ">
                <label htmlFor="firstname">Firstname</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstname"
                  id="firstname"
                />
              </div>
              <div className="form-group ">
                <label htmlFor="lastname">Lastname</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastname"
                  id="lastname"
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">@</div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                  />
                </div>
              </div>
              <div className="form-group ">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label htmlFor="inlineFormCustomSelectPref">Day</label>
                <select className="custom-select" id="day" name="day">
                  <option value="">Choose</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="inlineFormCustomSelectPref">Month</label>
                <select className="custom-select " id="month" name="month">
                  <option value="">Choose</option>
                  <option value="Jan">Jan</option>
                  <option value="Feb">Feb</option>
                  <option value="Mar">Mar</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="inlineFormCustomSelectPref">Year</label>
                <select className="custom-select " id="year" name="year">
                  <option value="">Choose</option>
                  <option value="1995">1995</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select className="custom-select " id="gender" name="gender">
                  <option value="">Choose</option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="repassword">Password Again</label>
                <input
                  type="password"
                  className="form-control"
                  name="repassword"
                  id="repassword"
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-block btn-primary">
            Submit
          </button>
        </form>
        <div className="container mt-2">
          {success && (
            <>
              <p className="alert alert-success">{success}</p>
            </>
          )}

          {errors && (
            <>
              {errors.map(error => {
                return (
                  <p
                    key={Math.floor(Math.random() * 100) + 1}
                    className="alert alert-danger"
                  >
                    {error.message}
                  </p>
                );
              })}
            </>
          )}
        </div>
      </>
    );
  }
}

export default Registration;
