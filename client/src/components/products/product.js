import React from "react";
import { Link } from "react-router-dom";

export default function details(props) {
  const { product } = props;
  return (
    <React.Fragment>
      <div className="col-lg-4 col-md-6 mb-4">
        <div className="card h-100">
          <Link to="#">
            <img
              className="card-img-top"
              src="http://placehold.it/700x400"
              alt=""
            />
          </Link>
          <div className="card-body">
            <h4 className="card-title">
              <Link to={/details/ + product._id}>{product.title}</Link>
            </h4>
            <p className="card-text">{product.description}</p>
          </div>
          <div className="card-footer">
            <small className="text-muted">
              &#9733; &#9733; &#9733; &#9733; &#9734;
            </small>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
