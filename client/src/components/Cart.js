import React, { Component } from 'react'
import axios from 'axios';

export default class Cart extends Component {
    state = {
        cartItems: ''
    }
    async componentDidMount() {
        if(localStorage.getItem('cart')) {
           const cartItems =  JSON.parse(localStorage.getItem('cart'));
           this.setState({cartItems})
        }
    }

  render() {
    const res = this.state.cartItems ? (
        this.state.cartItems.map(el => {
            return <li key={el._id}>
                <p>{el.title}</p>
                <p>{el.description}</p>
                <p><img src={el.imageUrl} alt={el.imageUrl}/></p>
            </li>
        })
    ): (<h2></h2>)
    
    return (
      <div>
        <div>{res || this.state.result}</div>
      </div>
    )
  }
}
