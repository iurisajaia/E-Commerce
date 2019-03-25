import React from "react";
import { Link } from "react-router-dom";
export default function details(props) {
  const { product } = props;

  return (
    <React.Fragment>
      <div className="col-md-3 col-sm-12 mb-3 product-left">
        <div className="p-one simpleCart_shelfItem">
          <Link to={/details/ + product._id}>
            <img src={product.imageUrl} alt={product.title} />
            <div className="mask">
              <span>Quick View</span>
            </div>
          </Link>
          <h4>{product.title}</h4>
          <p>
            <Link className="item_add" to="#">
              <span className=" item_price">${product.price}</span>
            </Link>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}
