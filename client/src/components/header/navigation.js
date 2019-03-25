import React from "react";
import { Link } from "react-router-dom";
function Navigation(props) {
  return (
    <>
      <div className="header">
        <div className="header-top">
          <div className="header-bottom">
            <div className="container db-flex">
              <div className="logo">
                <h1>
                  <Link to="/">
                    I-<span>wear</span>
                  </Link>
                </h1>
              </div>

              <div className="top-nav">
                <ul className="memenu skyblue">
                  <li className="active">
                    <Link to="">Home</Link>
                  </li>
                  <li className="grid">
                    <Link to="/">Products</Link>
                  </li>
                  <li className="grid">
                    <Link to="/">Orders</Link>
                  </li>
                  <li className="grid">
                    <Link to="/">Products</Link>
                  </li>
                </ul>
                <div className="clearfix"> </div>
              </div>
              {/* <!----> */}
              <div className="cart box_1">
                <Link to="/checkout">
                  <h3>
                    {" "}
                    <div className="total">
                      <span className="simpleCart_total"> </span> (
                      <span
                        id="simpleCart_quantity"
                        className="simpleCart_quantity"
                      >
                        {" "}
                      </span>
                      )
                    </div>
                    <img src="/img/cart2-2.png" alt="" />
                  </h3>
                </Link>
                <p>
                  <Link to="/cart" className="simpleCart_empty">
                    Empty Cart
                  </Link>
                </p>
                <div className="clearfix"> </div>
              </div>

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

export default Navigation;
