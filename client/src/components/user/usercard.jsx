import React, { Component } from "react";
import { Link } from "react-router-dom";
class UserCard extends Component {
  state = {};
  render() {
    const user = this.props.user;
    return (
      <>
        <div className="card col-md-4 col-sm-12 mb-3">
          {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
          <div className="card-body">
            <Link className="card-title" to={/user/ + user._id}>
              {user.firstname} {user.lastname}
            </Link>
            <h5 className="card-title">{user.username}</h5>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{user.email}</li>
            <li className="list-group-item">{user.gender}</li>
            <li className="list-group-item">{user.money}</li>
            {/* <li className="list-group-item">Products : {user.products}</li> */}
            <li className="list-group-item">
              {user.day}/{user.month}/{user.year}
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default UserCard;
