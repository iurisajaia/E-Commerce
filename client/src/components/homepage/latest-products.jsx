import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Product from "../products/product";
import { MyContext } from "../../State";
class LatestProducts extends Component {
  state = {};
  render() {
    return (
      <>
        <MyContext.Consumer>
          {context => (
            <>
              <div className="goggles">
                <div className="container">
                  <h2>Latest Products</h2>
                  <div className="product-one">
                    {context.state.products
                      ? context.state.products.map(product => {
                          return (
                            <Product
                              key={product._id}
                              product={product}
                              // companies={context.state.companies}
                            />
                          );
                        })
                      : null}
                    <div className="clearfix"> </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </MyContext.Consumer>
      </>
    );
  }
}

export default LatestProducts;
