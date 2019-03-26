import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { MyContext } from "../../../State";
import axios from "axios";

class ProductPart extends Component {
  state = {};

  addToDetails = async () => {
    const productID = this.props.id;
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
              <div className="row">
                <div className="col-md-5 col-sm-12 single-top">
                  <img
                    className="single-product__img"
                    src={`/${product.imageUrl}`}
                    alt={product.title}
                  />
                </div>
                <div className="col-md-7 col-sm-12 single-top-in simpleCart_shelfItem">
                  <div className="product-info">
                    <h4 className="product-title">
                      {" "}
                      <i className="fas fa-tshirt" /> {product.title}
                    </h4>
                    <hr className="custom-line" />

                    <h5 className="product-price">
                      <i className="fas fa-dollar-sign" /> {product.price}
                    </h5>

                    <hr className="custom-line" />

                    <h4 className="product-description">
                      <i className="fas fa-quote-left" />
                      {product.description}
                      <i className="fas fa-quote-right" />
                    </h4>

                    <hr className="custom-line" />

                    <h4 className="product-seller">
                      <i className="fab fa-creative-commons-by" />
                      {product.company}
                    </h4>

                    <hr className="custom-line" />

                    <div className="flex mt-3">
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
                        <button className="cart-btn">Add To Cart</button>
                      </form>
                      <button
                        className="compare-btn ml-4"
                        onClick={this.addToDetails}
                      >
                        Compare
                      </button>
                    </div>
                    <hr className="custom-line" />
                  </div>
                </div>
                <div className="clearfix"> </div>
              </div>
            ) : null}
          </>
        )}
      </MyContext.Consumer>
    );
  }
}

export default ProductPart;
