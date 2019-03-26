import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../State";
class HeaderTop extends Component {
  static contextType = MyContext;
  state = {};
  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <>
            <header className="shop-header">
              <div className="aside-left">
                <img src="/img/techub-logo-3.png" />
                <ul className="menu-list">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/products">Products</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
              <div className="aside-right">
                {context.state.user && (
                  <>
                    <ul className="menu-list">
                      <li>
                        <Link to={/me/ + context.state.user._id}>
                          <i className="far fa-user" />
                          <br />
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/compare">
                          <i className="fas fa-glasses" />
                          <br />
                          Compare
                        </Link>
                      </li>
                      <li>
                        <Link to="/cart">
                          <i className="fas fa-shopping-bag" />
                          <br />
                          Cart
                        </Link>
                      </li>
                      <li>
                        <Link to="/" onClick={this.props.handleLogout}>
                          <i className="fas fa-power-off" />
                          <br />
                          Log Out
                        </Link>
                      </li>
                    </ul>
                  </>
                )}
                {!context.state.user && (
                  <>
                    <ul className="menu-list">
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                      <li>
                        <Link to="/registration">Registration</Link>
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </header>
          </>
        )}
      </MyContext.Consumer>
    );
  }
}

export default HeaderTop;
