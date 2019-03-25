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
              <div className="col-md-4 footer-top">
                <h3>Subscribe</h3>
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
              <div className="col-md-4 footer-middle">
                <h3>Team</h3>
                <div className="product-go">
                  <ul>
                    <li className="btn btn-info mb-1 d-block">Iuri Sajaia</li>
                    <li className="btn btn-info mb-1 d-block">
                      Guga Tchetchelashvili
                    </li>
                    <li className="btn btn-info mb-1 d-block">
                      Irakli Mtchedlishvili
                    </li>
                    <li className="btn btn-info mb-1 d-block">
                      David Varadashvili
                    </li>
                  </ul>
                  <Link to="http://techub.ge">
                    <img
                      className="img-responsive "
                      src="/img/techub-logo-3.png"
                      alt=""
                    />
                  </Link>

                  <div className="clearfix"> </div>
                </div>
              </div>
              <div className="col-md-4 footer-bottom">
                <h3>Get In Touch</h3>
                <div className="logo-footer">
                  <ul className="social">
                    <li>
                      <Link to="#">
                        <i className="fb"> </i>{" "}
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i className="rss"> </i>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i className="twitter"> </i>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i className="dribble"> </i>
                      </Link>
                    </li>
                    <div className="clearfix"> </div>
                  </ul>
                  <div className="clearfix"> </div>
                </div>
                <div className="indo">
                  <ul className="social-footer ">
                    <li>
                      <span>
                        <i className="glyphicon glyphicon-earphone"> </i>+955
                        598 12 34 56{" "}
                      </span>
                    </li>
                    <li>
                      <Link to="mailto:info@example.com">
                        <i
                          className="glyphicon glyphicon-envelope"
                          className="mes"
                        >
                          {" "}
                        </i>
                        info@ibuy.com
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i
                          className="glyphicon glyphicon-link"
                          className="mes-in"
                        >
                          {" "}
                        </i>
                        http://ibuy.com
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="clearfix"> </div>
            <p className="footer-class">
              <Link to="/"> Copyrights © 2018 I Buy. All rights reserved</Link>
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default Footer;
