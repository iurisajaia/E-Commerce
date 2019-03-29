import React, { Component } from "react";
import { Link } from "react-router-dom";
import Product from "../products/product";
import { MyContext } from "../../State";
class LatestProducts extends Component {
  static contextType = MyContext;
  state = {};
  render() {
    // console.log(this.context.state);
    return (
      <>
        <MyContext.Consumer>
          {context => (
            <>
              <div className="container">
                <div className="text-center">
                  <h2 className="section-title">Latest Products</h2>
                </div>
                <div className="products-row">
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
                <div className="text-center">
                  <Link to="/products" className="section-title-link">
                    See All
                  </Link>
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
