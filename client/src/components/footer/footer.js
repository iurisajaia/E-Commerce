import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  state = {
    inputValue: ""
  };
  myFunction = () => {
    const data = {
      email: this.state.inputValue
    };
    fetch("http://localhost:5000/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.error(error);
      });
  };

  inputFn = e => {
    this.setState({ inputValue: e.target.value });
  };
  render() {
    return (
      <>
        <div className="footer">
          <div className="container">
            <div className="row text-center">
              <div className="col-md-3">
                <div className="footer-top-box">
                  <h5>Online Shopping</h5>
                </div>
                <ul className="footer-navigation">
                  <li>
                    <Link to="/products">Products</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                  <li>
                    <Link to="/compare">Compare</Link>
                  </li>
                </ul>
              </div>
              <div className="col-md-3">
                <div className="footer-top-box">
                  <h5>Useful Links</h5>
                </div>
                <ul className="footer-navigation">
                  <li>
                    <Link to="/products">Terms Of Services</Link>
                  </li>
                  <li>
                    <Link to="/about">FAQ</Link>
                  </li>
                  <li>
                    <Link to="/contact">Terms Of Use</Link>
                  </li>
                  <li>
                    <Link to="/compare">Blog</Link>
                  </li>
                </ul>
              </div>
              <div className="col-md-3">
                <div className="footer-top-box">
                  <h5>Keep In Touch</h5>
                </div>
                <ul className="footer-navigation-social">
                  <li>
                    <i class="fab fa-facebook" />
                  </li>
                  <li>
                    <i class="fab fa-twitter-square" />
                  </li>
                  <li>
                    <i class="fab fa-instagram" />
                  </li>
                  <li>
                    <i class="fab fa-youtube" />
                  </li>
                </ul>
              </div>
              <div className="col-md-3">
                <div className="footer-top-box">
                  <h5>Subscribe</h5>
                </div>
                <form onSubmit={this.myFunction}>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your Email"
                    onChange={e => this.inputFn(e)}
                  />

                  <button
                    type="submit"
                    className="btn btn-info d-block mt-2 subscribe-button"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
            <div className="clearfix"> </div>
            <p className="footer-copyright">
              <Link to="/"> Copyrights © 2018 I Buy. All rights reserved</Link>
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default Footer;
