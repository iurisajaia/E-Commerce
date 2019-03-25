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
    console.log(carts);
    return (
      <>
        {carts && (
          <>
            <div style={{ marginTop: 50 }}>
              {carts.map(cart => {
                return (
                  <div key={cart._id} className="row">
                    <div className="col-md-2">
                      quantity :{" "}
                      {cart.total > cart.price ? cart.total / cart.price : null}{" "}
                      <br /> {cart.quantity}
                      <select
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
                    </div>
                    <div className="col-md-2">
                      company : <br /> {cart.company}
                    </div>
                    <div className="col-md-2">
                      price : <br /> {cart.price}
                    </div>
                    <div className="col-md-2">
                      <img
                        className="img-thumbnail"
                        src={cart.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="col-md-2">
                      <form action="" onSubmit={removeProductFromCart}>
                        <input type="hidden" value={user._id} id="cartUser" />
                        <input type="hidden" value={cart._id} id="cartId" />
                        <button className="btn btn-danger">Remove</button>
                      </form>
                    </div>
                  </div>
                );
              })}
              {total > 0 ? (
                <>
                  <h4 className="alert alert-warning d-block mt-2">{total}</h4>
                  <Link to="/Checkout" className="btn btn-success">
                    Checkout
                  </Link>
                </>
              ) : null}
            </div>
          </>
        )}
      </>
    );
  }
}

export default ShopCart;
