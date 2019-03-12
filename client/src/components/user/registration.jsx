import React, { Component } from "react";

class Registration extends Component {
  state = {};
  render() {
    return (
      <form className="login-form">
        <div className="form-group ">
          <label for="exampleInputEmail1">Firstname</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group ">
          <label for="exampleInputEmail1">Lastname</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="">
          <label className="sr-only" for="inlineFormInputGroup">
            Username
          </label>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">@</div>
            </div>
            <input
              type="text"
              className="form-control"
              id="inlineFormInputGroup"
              placeholder="Username"
            />
          </div>
        </div>
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
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
          />
        </div>
        <label class="my-1 mr-2" for="inlineFormCustomSelectPref">
          Day
        </label>
        <select
          class="custom-select my-1 mr-sm-2"
          id="inlineFormCustomSelectPref"
        >
          <option selected>Choose...</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        <label class="my-1 mr-2" for="inlineFormCustomSelectPref">
          Month
        </label>
        <select
          class="custom-select my-1 mr-sm-2"
          id="inlineFormCustomSelectPref"
        >
          <option selected>Choose...</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        <label class="my-1 mr-2" for="inlineFormCustomSelectPref">
          Year
        </label>
        <select
          class="custom-select my-1 mr-sm-2"
          id="inlineFormCustomSelectPref"
        >
          <option selected>Choose...</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        <div class="custom-control custom-radio">
          <input
            type="radio"
            id="customRadio1"
            name="customRadio"
            class="custom-control-input"
          />
          <label class="custom-control-label" for="customRadio1">
            Male
          </label>
        </div>
        <div class="custom-control custom-radio">
          <input
            type="radio"
            id="customRadio2"
            name="customRadio"
            class="custom-control-input"
          />
          <label class="custom-control-label" for="customRadio2">
            Female
          </label>
        </div>

        <button type="submit" className="btn btn-block btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default Registration;
