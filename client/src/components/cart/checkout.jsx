import React, { Component } from "react";

import { MyContext } from "../../State";
import { Link } from "react-router-dom";
class Checkout extends Component {
  state = {};
  render() {
    console.log(this.context.state);
    return (
      <MyContext.Consumer>
        {context => (
          <>
            <div className="checkout-container mt-4">
              {context.state.carts ? (
                <h4 className="cart-prod_title d-block mt-2">
                  <i className="fas fa-shopping-bag" />
                  &nbsp;&nbsp;&nbsp;
                  {context.state.carts.length}
                </h4>
              ) : null}
              <hr className="custom-line" />
              <h4 className="cart-prod_title d-block mt-2">
                <i className="fas fa-dollar-sign" />
                &nbsp;&nbsp;&nbsp; {context.state.cartTotal}
              </h4>
              <hr className="custom-line" />

              {context.state.user ? (
                <>
                  <p className="alert alert-warning">
                    Make Sure If Your Information Is Correct! You can change
                    info from here{" "}
                    <Link to={/me/ + context.state.user._id}>
                      {context.state.user.firstname}
                    </Link>
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
                <button type="submit" className="btn btn-block btn-success">
                  Buy Products
                </button>
              </form>
              {context.state.moneyerror ? (
                <>
                  <p className="alert alert-danger text-center">
                    {context.state.moneyerror}
                  </p>
                </>
              ) : null}
            </div>
          </>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Checkout;
