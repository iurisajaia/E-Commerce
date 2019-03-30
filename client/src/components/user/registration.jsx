import React, { Component } from "react";
import { Link } from 'react-router-dom'
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
      gender: event.target.gender.value,
      terms: event.target.acceptterms.checked
    };



    fetch("/registration", {
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

    var year = [];
    for (let i = 1960; i < 2014; i++) {
      year.push(i)
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
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="inlineFormCustomSelectPref">Month</label>
                <select className="custom-select " id="month" name="month">
                  <option value="">Choose</option>
                  <option value="Jan">Jan</option>
                  <option value="Feb">Feb</option>
                  <option value="Mar">Mar</option>
                  <option value="Apr">Apr</option>
                  <option value="May">May</option>
                  <option value="Jun">Jun</option>
                  <option value="Jul">Jul</option>
                  <option value="Aug">Aug</option>
                  <option value="Sep">Sep</option>
                  <option value="Oct">Oct</option>
                  <option value="Nov">Nov</option>
                  <option value="Dec">Dec</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="inlineFormCustomSelectPref">Year</label>
                <select className="custom-select " id="year" name="year">
                  {year.map(m => {
                    return <option key={m} value={m}>{m}</option>
                  })}

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
          <div className="text-center">
            <label htmlFor="acceptterms">I agree to the <Link to="/terms">terms of service</Link></label>
            <input type="checkbox" className="custom-checkbox" id="acceptterms" />
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
