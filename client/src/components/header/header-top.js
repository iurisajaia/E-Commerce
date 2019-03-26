import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../State";
class HeaderTop extends Component {
  static contextType = MyContext;
  state = {};
  render() {
    var compareLength = this.props.compareLength;
    return (
      <MyContext.Consumer>
        {context => (
          <>
            <header className="shop-header">
              <div className="aside-left">
                <img src="/img/techub-logo-3.png" alt="logo" />
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
                        <Link to="/orders">
                          <i className="far fa-hourglass" />
                          <br />
                          Orders
                        </Link>
                      </li>
                      <li className="number-catcher">
                        <Link to="/compare">
                          <i className="fas fa-glasses" />
                          <br />
                          {compareLength ? (
                            <span className="number_counter">
                              {compareLength}
                            </span>
                          ) : null}
                          Compare
                        </Link>
                      </li>
                      <li className="number-catcher">
                        <Link to="/cart">
                          <i className="fas fa-shopping-bag" />
                          <br />
                          {context.state.carts ? (
                            <>
                              {context.state.carts.length > 0 ? (
                                <span className="number_counter cart-counter">
                                  {context.state.carts.length}
                                </span>
                              ) : null}
                            </>
                          ) : null}
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
