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
                <div className="row">
                  <div className="col-md-6 mb-3">
                    {context.state.user ? (
                      <>
                        <input
                          type="hidden"
                          value={context.state.user._id}
                          id="idofuser"
                        />
                        <input
                          type="hidden"
                          data-prodcarts={context.state.carts}
                          id="usercarts"
                        />
                      </>
                    ) : null}
                    <label htmlFor="cc-name">Name on card</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-name"
                      placeholder=""
                      required=""
                    />
                    <small className="text-muted">
                      Full name as displayed on card
                    </small>
                    <div className="invalid-feedback">
                      Name on card is required
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cc-number">Credit card number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-number"
                      placeholder=""
                      required=""
                    />
                    <div className="invalid-feedback">
                      Credit card number is required
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="cc-expiration">Expiration</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-expiration"
                      placeholder=""
                      required=""
                    />
                    <div className="invalid-feedback">
                      Expiration date required
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="cc-expiration">CVV</label>
                    <input
                      htmlFor="text"
                      className="form-control"
                      id="cc-cvv"
                      placeholder=""
                      required=""
                    />
                    <div className="invalid-feedback">
                      Security code required
                    </div>
                  </div>
                </div>
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
