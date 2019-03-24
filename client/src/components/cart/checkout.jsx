import React, { Component } from "react";

import { MyContext } from "../../State";
import { Link } from "react-router-dom";
class Checkout extends Component {
  state = {};
  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <>
            <div className="checkout-container">
              <h1>Total : {context.state.cartTotal}</h1>
              {context.state.carts ? (
                <h1>Products : {context.state.carts.length}</h1>
              ) : null}

              {context.state.user ? (
                <>
                  <p className="alert alert-warning">
                    Make Sure If Your Address Information Is Correct!
                    <span className="badge badge-primary ml-2">
                      You can change info from here{" "}
                      <Link style={{ color: "red" }} to="/me">
                        {context.state.user.firstname}
                      </Link>
                    </span>
                  </p>
                  <ul className="list-group">
                    <li className="list-group-item">
                      city : {context.state.user.city}
                    </li>
                    <li className="list-group-item">
                      adress : {context.state.user.adress}
                    </li>
                    <li className="list-group-item">
                      phone : {context.state.user.phone}
                    </li>
                    <li className="list-group-item">
                      zip : {context.state.user.zip}
                    </li>
                  </ul>
                </>
              ) : null}
              <br />
              <br />

              <form className="form-group" onSubmit={context.cheCkoutProduct}>
                <div className="row" style={{ width: "300px" }}>
                  <input
                    type="text"
                    placeholder="0123"
                    maxLength="4"
                    className="form-control col-lg-3 col-md-3 col-sm-3"
                    id="cartone"
                  />
                  <input
                    type="text"
                    placeholder="4567"
                    maxLength="4"
                    className="form-control col-lg-3 col-md-3 col-sm-3"
                    id="carttwo"
                  />
                  <input
                    type="text"
                    placeholder="8901"
                    maxLength="4"
                    className="form-control col-lg-3 col-md-3 col-sm-3"
                    id="cartthree"
                  />
                  <input
                    type="text"
                    placeholder="2345"
                    maxLength="4"
                    className="form-control col-lg-3 col-md-3 col-sm-3"
                    id="cartfour"
                  />
                </div>
                <div className="row" style={{ width: "300px" }}>
                  <select name="" id="month" className="custom-select col-6">
                    <option value="01">01</option>
                  </select>
                  <select name="" id="year" className="custom-select col-6">
                    <option value="2019">19</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="123"
                  maxLength="3"
                  className="form-control"
                  id="cec"
                  style={{ width: "300px" }}
                />
                <button type="submit" className="btn btn-block btn-success">
                  Buy Products
                </button>
              </form>
            </div>
          </>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Checkout;
