import { Link } from "react-router-dom";
import React, { Component } from "react";
import { MyContext } from "../State";

class Navbar extends Component {
  static contextType = MyContext;

  state = {
    compareLength: 0
  };
  handleLogout = () => {
    localStorage.clear();
    window.location = "/";
  };

  componentDidMount() {
    var compare = JSON.parse(localStorage.getItem("details"));
    if (compare) {
      this.setState({
        compareLength: compare.length
      });
    }
  }

  render() {
    var compareLength;
    if (this.state.compareLength > 0) {
      compareLength = this.state.compareLength;
    }

    return (
      <MyContext.Consumer>
        {context => (
          <>
            {console.log(context.state, "navbar")}
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarCollapse"
                aria-controls="navbarCollapse"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                {context.state.user && (
                  <>
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item active">
                        <Link to="/" className="nav-link">
                          Home
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/products" className="nav-link">
                          Products
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/compare" className="nav-link">
                          Compare
                          <span className="badge badge-primary">
                            {compareLength}
                          </span>
                        </Link>
                      </li>
                      <li className="nav-item">
<<<<<<< HEAD
                        <Link to="/subscribe" className="nav-link">
                          Subscribe
=======
                        <Link to="/orders" className="nav-link">
                          Orders
>>>>>>> 8f47ed05afea97d1952092d545b6ae11d3e547ee
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/cart" className="nav-link">
                          <i className="fas fa-cart-plus" />

                          {context.state.carts ? (
                            <span className="badge badge-primary">
                              {context.state.carts.length}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    </ul>

                    <div className="form-inline mt-2 mt-md-0">
                      <Link to="/me">{context.state.user.username}</Link>
                      <span className="badge badge-warning ml-2 mr-2">
                        $ {context.state.user.money}
                      </span>
                      <button
                        className="btn btn-outline-danger my-2 my-sm-0 ml-2"
                        type="submit"
                        onClick={this.handleLogout}
                      >
                        Log Out
                      </button>
                    </div>
                  </>
                )}
                {!context.state.user && (
                  <>
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item active">
                        <Link to="/" className="nav-link">
                          Home
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/registration" className="nav-link">
                          Registration
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/login" className="nav-link">
                          Login
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/products" className="nav-link">
                          Products
                        </Link>
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </nav>
          </>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Navbar;
