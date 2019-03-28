import React, { Component } from "react";
import { Link } from "react-router-dom";
class AnotherProducts extends Component {
  state = {};
  render() {
    const product = this.props.similarfilter;
    return (
      <>
        <div className="similar-products">
          {this.props.product ? (
            <>
              <h3 className="section-title">
                All products from - {this.props.product.company}
              </h3>

              <div className="similar-products-box">
                {product ? (
                  <>
                    {product.map(prod => {
                      return (
                        <div className="another-item" key={prod._id}>
                          <img src={`/${prod.imageUrl}`} alt={prod.title} />
                          <Link to={/details/ + prod._id} target="_blank">
                            {prod.title}
                          </Link>
                        </div>
                      );
                    })}
                  </>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </>
    );
  }
}

export default AnotherProducts;
