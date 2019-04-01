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
          <a data-toggle="tab" href="#menu1" className="mr-3">
            Products
          </a>
        </li>
        <li>
          <a data-toggle="tab" href="#menu2" className="mr-3">
            Categories
          </a>
        </li>
        <li>
          <a data-toggle="tab" href="#menu3" className="mr-3">
            Companies
          </a>
        </li>
        <li>
          <a data-toggle="tab" href="#adminmessages" className="mr-3">
            Messages
          </a>
        </li>
        <li>
          <a data-toggle="tab" href="#hoodies" className="mr-3">
            Hoodies
          </a>
        </li>
        <li>
          <a data-toggle="tab" href="#adminstatistics" className="mr-3">
            Statistic
          </a>
        </li>
      </ul>
    );
  }
}

export default ProfileNav;
