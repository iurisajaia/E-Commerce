import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <Link to="/" class="nav-link">
              Home
            </Link>
          </li>
          <li class="nav-item">
            <Link to="/registration" class="nav-link">
              Registration
            </Link>
          </li>
          <li class="nav-item">
            <Link to="/login" class="nav-link">
              Login
            </Link>
          </li>
        </ul>
        {/* <form class="form-inline mt-2 mt-md-0">
        </form> */}
      </div>
    </nav>
  );
};

export default Navbar;
