// import { Link } from "react-router-dom";
import React, { Component } from "react";
import { MyContext } from "../../State";

import HeaderTop from "./header-top";
import Navigation from "./navigation";
class Navbar extends Component {
  static contextType = MyContext;

  state = {
    compareLength: 0
  };
  handleLogout = () => {
    localStorage.clear();
    window.location = "/";
  };

  componentDidMount() {
    var compare = JSON.parse(localStorage.getItem("details"));
    if (compare) {
      this.setState({
        compareLength: compare.length
      });
    }
  }

  render() {
    var compareLength;
    if (this.state.compareLength > 0) {
      compareLength = this.state.compareLength;
    }

    if (this.context.state.user) {
      var user = this.context.state.user;
    }

    return (
      <MyContext.Consumer>
        {context => (
          <>
            <>
              <HeaderTop user={user} handleLogout={this.handleLogout} />

              <Navigation compareLength={compareLength} user={user} />
            </>
          </>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Navbar;
