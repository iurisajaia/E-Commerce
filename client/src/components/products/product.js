import React from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../State";
// import axios from "axios";
export default function details(props) {
  const { product } = props;

  return (
    <MyContext.Consumer>
      {context => (
        <>
          <div className="product-item">
            <div className="item-box">
              <div className="image-box">
                <img src={`/${product.imageUrl}`} alt={product.title} />
                <div className="over-image-box">
                  <form onSubmit={context.addProductToShopCart}>
                    <input type="hidden" value={product._id} id="product" />

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
                    value={product._id}
                    className="compare-btn"
                    onClick={context.addToDetails}
                  >
                    Compare
                  </button>
                </div>
              </div>

              <div className="product-info">
                <Link to={/details/ + product._id}>{product.title}</Link>
                <span>${product.price}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </MyContext.Consumer>
  );
}
