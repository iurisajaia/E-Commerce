import React, { Component } from "react";
// import axios from 'axios';

export default class Cart extends Component {
  state = {
    cartItems: ""
  };
  async componentDidMount() {
    if (localStorage.getItem("cart")) {
      const cartItems = JSON.parse(localStorage.getItem("cart"));
      this.setState({ cartItems });
    }
  }

  remove = (id) => {
    let items = JSON.parse(localStorage.getItem("cart"));
    let tartetProduct = items.filter(product => {
      return product._id == id
    });
    items.splice(items.indexOf(tartetProduct),1)
    console.log(items)
    this.setState({ cartItems:items });
    localStorage.setItem('cart',JSON.stringify(items))
  }

  render() {
    const res = this.state.cartItems ? (
      this.state.cartItems.map(el => {
        return (
          <li key={el._id} className="list-group-item">
            <p>{el.title}
              <button onClick={() => this.remove(el._id)}>Remove</button>
            </p>
            {/* <p>{el.description}</p>
            <p>
              <img src={el.imageUrl} alt={el.imageUrl} />
            </p> */}
          </li>
        );
      })
    ) : (
      <> </>
    );

    return (
      <div>
        <div>{res || this.state.result}</div>
      </div>
    );
  }
}
