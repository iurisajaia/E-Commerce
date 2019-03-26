import React, { Component } from "react";
import { MyContext } from "../../State";
import { Link } from "react-router-dom";
class ShopCart extends Component {
  static contextType = MyContext;

  state = {};

  render() {
    var carts = this.context.state.carts;
    var user = this.context.state.user;
    var removeProductFromCart = this.context.removeProductFromCart;
    var updateCart = this.context.updateCart;
    var total = this.context.state.cartTotal;

    return (
      <>
        {carts && (
          <>
            <div className="cart-row mt-4">
              <div className="container">
                <div className="row">
                  <div className="col-md-9">
                    {carts.map(cart => {
                      return (
                        <div className="row mb-5">
                          <div className="col-md-3 col-sm-12 cart-image-section">
                            <img
                              className="img-thumbnail"
                              src={cart.imageUrl}
                              alt=""
                            />
                          </div>
                          <div className="col-md-9 col-sm-12">
                            <h4 className="cart-prod_title">
                              <i class="fas fa-tshirt" />
                              &nbsp;&nbsp;&nbsp;
                              {cart.title}
                            </h4>
                            <hr className="custom-line" />
                            <h4 className="cart-prod_title">
                              <i class="fab fa-creative-commons-by" />
                              &nbsp;&nbsp;&nbsp;{cart.company}
                            </h4>{" "}
                            <h4 className="cart-prod_title">
                              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;
                              <i class="fas fa-dollar-sign" />{" "}
                              &nbsp;&nbsp;&nbsp;{cart.price}
                            </h4>
                            <hr className="custom-line" />
                            <h4 className="cart-prod_title">
                              <i class="fas fa-luggage-cart" />
                              &nbsp; quantity : &nbsp;&nbsp;&nbsp;
                              {cart.total > cart.price
                                ? cart.total / cart.price
                                : null}{" "}
                            </h4>
                            <select
                              className="custom-select cart-select"
                              onChange={updateCart}
                              data-prodid={cart._id}
                              data-userid={user._id}
                            >
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
                            </select>
                            <hr className="custom-line" />
                            <form action="" onSubmit={removeProductFromCart}>
                              <input
                                type="hidden"
                                value={user._id}
                                id="cartUser"
                              />
                              <input
                                type="hidden"
                                value={cart._id}
                                id="cartId"
                              />
                              <button className="btn btn-danger">Remove</button>
                            </form>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="col-md-3">
                    <div className="cart-counter-box">
                      {total > 0 ? (
                        <>
                          <h4 className="cart-prod_title d-block mt-2">
                            <i class="fas fa-shopping-bag" />
                            &nbsp;&nbsp;&nbsp;
                            {carts.length}
                          </h4>
                          <hr className="custom-line" />
                          <h4 className="cart-prod_title d-block mt-2">
                            <i class="fas fa-dollar-sign" />
                            &nbsp;&nbsp;&nbsp; {total}
                          </h4>
                          <hr className="custom-line" />
                          <Link to="/Checkout" className="checkout-button">
                            Checkout
                          </Link>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}

export default ShopCart;
