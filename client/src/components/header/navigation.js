import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navigation extends Component {
  render() {
    return (
      <>
        <div className="header">
          <div className="header-top">
            <div className="header-bottom">
              <div className="container db-flex">
                <div className="logo">
                  <h1>
                    <Link to="/">
                      I-<span>buy</span>
                    </Link>
                  </h1>
                </div>

                <div className="top-nav">
                  <ul className="memenu skyblue">
                    <li className="active">
                      <Link to="">Home</Link>
                    </li>
                    <li className="grid">
                      <Link to="/products">Products</Link>
                    </li>
                    {this.props.user ? (
                      <>
                        <li className="grid">
                          <Link to="/orders">Orders</Link>
                        </li>
                        <li className="grid">
                          <Link to="/compare">Compare</Link>
                        </li>
                      </>
                    ) : null}
                  </ul>
                  <div className="clearfix"> </div>
                </div>
                {/* <!----> */}

                <div className="clearfix"> </div>
                {/* <!----> */}
              </div>
              <div className="clearfix"> </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Navigation;
