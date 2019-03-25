import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { MyContext } from "../../../State";
import axios from "axios";

class ProductPart extends Component {
  state = {};

  addToDetails = async () => {
    const productID = this.props.computedMatch.params.id;
    let details = [];
    if (localStorage.getItem("details")) {
      details = JSON.parse(localStorage.getItem("details"));
    } else {
      localStorage.setItem("details", JSON.stringify(details));
    }
    const res = await axios.get("http://localhost:5000/all-product");
    const product = res.data.filter(el => {
      return el._id.match(productID);
    });
    if (details.length < 2) {
      details.push(product[0]);
      localStorage.setItem("details", JSON.stringify(details));
    }
  };

  render() {
    let product = this.props.product;
    return (
      <MyContext.Consumer>
        {context => (
          <>
            {product.id ? (
              <>
                <div className="col-md-5 single-top">
                  <img
                    className="single-product__img"
                    src={`/${product.imageUrl}`}
                    alt={product.title}
                  />
                </div>
                <div className="col-md-7 single-top-in simpleCart_shelfItem">
                  <div className="single-para ">
                    <h4>{product.title}</h4>
                    <div className="star-on">
                      <div className="review">
                        <h6> 1 customer review </h6>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                    <h5 className="item_price">$ {product.price}</h5>
                    <div className="available">
                      <h4>{product.description}</h4>
                    </div>
                    <ul className="tag-men">
                      <li>
                        <span>Seller</span>
                        <span className="women1">{product.company}</span>
                      </li>
                      <li>
                        <h6
                          className="add-cart item_add"
                          onClick={this.addToDetails}
                        >
                          Compare
                        </h6>
                      </li>
                    </ul>
                    <form onSubmit={context.addProductToShopCart}>
                      <input type="hidden" value={product.id} id="product" />

                      {context.state.user && (
                        <>
                          <input
                            type="hidden"
                            id="user"
                            value={context.state.user._id}
                          />
                        </>
                      )}
                      <button className="add-cart item_add">Add To Cart</button>
                    </form>
                  </div>
                </div>
                <div className="clearfix"> </div>
              </>
            ) : null}
          </>
        )}
      </MyContext.Consumer>
    );
  }
}

export default ProductPart;
