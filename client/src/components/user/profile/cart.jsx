import React, { Component } from "react";
import { MyContext } from "../../../State";
class Cart extends Component {
  static contextType = MyContext;

  state = {};

  async componentDidMount() {
    fetch("http://localhost:5000/get-all-cart")
      .then(res => res.json())
      .then(res => this.setState({ carts: res }))
      .catch(err => console.log(err));
  }

  // remove product from cart
  removeProductFromCart = e => {
    e.preventDefault();
    const data = {
      product: e.target.cartProduct.value,
      user: e.target.cartUser.value
    };
    fetch("http://localhost:5000/remove-product-from-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.error(error);
      });
    e.target.parentElement.parentElement.remove();
  };

  render() {
    var carts = this.context.state.carts;
    var user = this.context.state.user;

    return (
      <>
        {carts && (
          <>
            <div style={{ marginTop: 50 }}>
              {carts.map(cart => {
                return (
                  <div key={cart._id} className="row">
                    <div className="col-md-2">
                      quantity : <br /> {cart.quantity}
                      <select onChange={this.updateCart}>
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
                      product : <br /> {cart.product}
                    </div>
                    <div className="col-md-2">
                      product : <br /> {cart.user}
                    </div>
                    <div className="col-md-2">
                      <form action="" onSubmit={this.removeProductFromCart}>
                        <input type="hidden" value={cart.user} id="cartUser" />
                        <input
                          type="hidden"
                          value={cart.product}
                          id="cartProduct"
                        />
                        <button className="btn btn-danger">Remove</button>
                      </form>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </>
    );
  }
}

export default Cart;
