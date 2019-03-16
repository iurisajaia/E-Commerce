import React, { Component } from "react";

class ProfileNav extends Component {
  state = {};
  render() {
    return (
      <ul className="nav nav-tabs">
        <li className="active">
          <a data-toggle="tab" href="#home" className="mr-3">
            Users
          </a>
        </li>
        <li>
          <a data-toggle="tab" href="#menu1">
            Products
          </a>
        </li>
        <li>
          <a data-toggle="tab" href="#menu2">
            Categories
          </a>
        </li>
        {/* <li><a data-toggle="tab" href="#menu3">Menu 3</a></li> */}
      </ul>
    );
  }
}

export default ProfileNav;
