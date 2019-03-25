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
            <div className="header-info">
              <div className="container">
                <div className="header-top-in">
                  <ul className="support">
                    <li>
                      <Link to="mailto:info@example.com">
                        <i className="fas fa-envelope" />
                        info@example.com
                      </Link>
                    </li>
                    <li>
                      <span>
                        <i className="fas fa-mobile-alt" />
                        +995 598 12 34 56
                      </span>
                    </li>
                  </ul>
                  <ul className=" support-right">
                    {context.state.user && (
                      <>
                        <li>
                          <Link to="/cart">
                            <i className="fas fa-shopping-basket user-cart">
                              {context.state.carts ? (
                                <span className="badge badge-success">
                                  {context.state.carts.length}
                                </span>
                              ) : null}
                            </i>
                          </Link>
                        </li>
                        <li>
                          <div className="dropdown">
                            <button
                              className="btn btn-info dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              {context.state.user.username}
                            </button>
                            <div
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuButton"
                            >
                              <Link className="dropdown-item" to="/me">
                                Profile
                              </Link>
                              <Link className="dropdown-item" to="/me">
                                Ballance - {context.state.user.money}$
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="/"
                                onClick={this.props.handleLogout}
                              >
                                Logout
                              </Link>
                            </div>
                          </div>
                        </li>
                      </>
                    )}
                    {!context.state.user && (
                      <>
                        <li>
                          <Link to="/login">
                            <i className="glyphicon glyphicon-user men"> </i>
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link to="/registration">
                            <i className="glyphicon glyphicon-lock tele"> </i>
                            Create an Account
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                  <div className="clearfix"> </div>
                </div>
              </div>
            </div>
          </>
        )}
      </MyContext.Consumer>
    );
  }
}

export default HeaderTop;
