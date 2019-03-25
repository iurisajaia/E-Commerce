import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="footer">
          <div className="container">
            <div className="col-md-4 footer-top">
              <h3>Quick Contact</h3>
              <form>
                <input type="text" />

                <input type="text" />

                <input type="text" />

                <input type="submit" placeholder="SEND MESSAGE" />
              </form>
            </div>
            <div className="col-md-4 footer-middle">
              <h3>Top Rated Products</h3>
              <div className="product-go">
                <div className="grid-product">
                  <h6>
                    <a href="#">Fashion Combo Goggles</a>
                  </h6>
                  <div className="rating">
                    <span>☆</span>
                    <span>☆</span>
                    <span>☆</span>
                    <span>☆</span>
                    <span>☆</span>
                  </div>
                  <span className=" price-in">
                    <small>$70.00</small> $40.00
                  </span>
                </div>
                <div className="fashion">
                  <a href="#">
                    <img className="img-responsive " src="/img/f1.jpg" alt="" />
                    <p>SALE</p>
                  </a>
                </div>
                <div className="clearfix"> </div>
              </div>
              <div className="product-go">
                <div className="grid-product">
                  <h6>
                    <a href="#">classNameic Combo Goggles</a>
                  </h6>
                  <div className="rating">
                    <span>☆</span>
                    <span>☆</span>
                    <span>☆</span>
                    <span>☆</span>
                    <span>☆</span>
                  </div>
                  <span className=" price-in">
                    <small>$70.00</small> $40.00
                  </span>
                </div>
                <div className="fashion">
                  <a href="#">
                    <img className="img-responsive " src="/img/f2.jpg" alt="" />
                    <p className="new1">NEW</p>
                  </a>
                </div>
                <div className="clearfix"> </div>
              </div>
              <div className="product-go">
                <div className="grid-product">
                  <h6>
                    <a href="#">sun Combo Goggles</a>
                  </h6>
                  <div className="rating">
                    <span>☆</span>
                    <span>☆</span>
                    <span>☆</span>
                    <span>☆</span>
                    <span>☆</span>
                  </div>
                  <span className=" price-in">
                    <small>$70.00</small> $40.00
                  </span>
                </div>
                <div className="fashion">
                  <a href="#">
                    <img className="img-responsive " src="/img/f3.jpg" alt="" />
                    <p className="new1">NEW</p>
                  </a>
                </div>
                <div className="clearfix"> </div>
              </div>
            </div>
            <div className="col-md-4 footer-bottom">
              <h3>Get In Touch</h3>
              <div className="logo-footer">
                <ul className="social">
                  <li>
                    <a href="#">
                      <i className="fb"> </i>{" "}
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="rss"> </i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="twitter"> </i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="dribble"> </i>
                    </a>
                  </li>
                  <div className="clearfix"> </div>
                </ul>
                <div className="clearfix"> </div>
              </div>
              <div className="indo">
                <ul className="social-footer ">
                  <li>
                    <span>
                      <i className="glyphicon glyphicon-earphone"> </i>+62
                      226759804{" "}
                    </span>
                  </li>
                  <li>
                    <a href="mailto:info@example.com">
                      <i
                        className="glyphicon glyphicon-envelope"
                        className="mes"
                      >
                        {" "}
                      </i>
                      info@example.com
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i
                        className="glyphicon glyphicon-link"
                        className="mes-in"
                      >
                        {" "}
                      </i>
                      http://example.com
                    </a>
                  </li>
                </ul>
                <a href="#">
                  <img src="/img/pa.png" alt="" />
                </a>
              </div>
            </div>
            <div className="clearfix"> </div>
            <p className="footer-class">
              Copyrights © 2015 I Wear. All rights reserved | Design by{" "}
              <a href="http://w3layouts.com/">W3layouts</a>
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default Footer;
