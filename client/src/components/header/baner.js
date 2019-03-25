import React from "react";
import { Link } from "react-router-dom";

function Baner(props) {
  return (
    <>
      <div className="header">
        <div className="banner">
          <div className="banner-top">
            <h2>THIS IS I-WEAR</h2>
            <p>
              Goggles or safety glasses are forms of protective eyewear
              <span>
                fthat usually enclose or protect the area surrounding the eye in
                order to prevent particulates.
              </span>
            </p>
          </div>
          <div className="now">
            <Link className="morebtn" to="/products">
              Explore
            </Link>
            <Link className="morebtn at-in" to="/me">
              Shop Now
            </Link>
            <div className="clearfix"> </div>
          </div>
        </div>
        <div className="clearfix"> </div>
      </div>
    </>
  );
}

export default Baner;
