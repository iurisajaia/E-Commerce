import React from "react";
import { Link } from "react-router-dom";
function HeaderTop(props) {
  return (
    <>
      <div className="header-info">
        <div className="container">
          <div className="header-top-in">
            <ul className="support">
              <li>
                <Link to="mailto:info@example.com">
                  <i className="glyphicon glyphicon-envelope"> </i>
                  info@example.com
                </Link>
              </li>
              <li>
                <span>
                  <i className="glyphicon glyphicon-earphone tele-in"> </i>0 462
                  261 61 61
                </span>
              </li>
            </ul>
            <ul className=" support-right">
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
            </ul>
            <div className="clearfix"> </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderTop;
