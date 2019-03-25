import React, { Component } from "react";
import { MyContext } from "../../../State";
class UserProfileForAdmin extends Component {
  static contextType = MyContext;

  render() {
    var users = this.context.state.admin;
    if (users) {
      var filteruser = users.filter(
        user => user._id === this.props.computedMatch.params.id
      );
      var user = filteruser[0];
    }
    console.log(this.state);
    return (
      <MyContext.Consumer>
        {context => (
          <>
            {user ? (
              <>
                <div className="container bootstrap snippet">
                  <div className="row">
                    <div className="col-sm-3">
                      <div className="text-center">
                        {user.gender === "male" ? (
                          <>
                            <img
                              src="http://btmarines.com/btmarines/wp-content/uploads/2017/03/user-placeholder.d2a3ff8.png"
                              className="avatar img-circle img-thumbnail"
                              alt="avatar"
                            />
                          </>
                        ) : (
                          <>
                            <img
                              src="http://www.thatentertains.com/wp-content/uploads/2018/01/female-place-holder-profile-image.jpg"
                              className="avatar img-circle img-thumbnail"
                              alt="avatar"
                            />
                          </>
                        )}
                      </div>
                      <hr />
                      <br />

                      <ul className="list-group">
                        <li className="list-group-item text-muted">
                          Activity <i className="fa fa-dashboard fa-1x" />
                        </li>
                        <li className="list-group-item">
                          <span className="pull-left">
                            <strong>Delivered Orders</strong>
                          </span>{" "}
                          {user.products ? <>{user.products.length}</> : null}
                        </li>
                        <li className="list-group-item">
                          <span className="pull-left">
                            <strong>Items In Cart</strong>
                          </span>{" "}
                          {user.carts ? <>{user.carts.length}</> : null}
                        </li>
                      </ul>
                    </div>
                    <div className="col-sm-9">
                      <ul className="nav nav-tabs">
                        <li className="">
                          <a data-toggle="tab" href="#information">
                            User Information
                          </a>
                        </li>
                        <li>
                          <a data-toggle="tab" href="#shipping">
                            User Shipping
                          </a>
                        </li>
                        <li>
                          <a data-toggle="tab" href="#products">
                            Products
                          </a>
                        </li>
                        <li>
                          <a data-toggle="tab" href="#messages">
                            Messages
                          </a>
                        </li>
                      </ul>

                      <div className="tab-content">
                        <div className="tab-pane" id="information">
                          <hr />
                          <form className="form row">
                            <div className="form-group col-md-6">
                              <div className="col-xs-6">
                                <label htmlFor="first_name">
                                  <h4>First name</h4>
                                </label>
                                <label id="first_name" className="form-control">
                                  {user.firstname}{" "}
                                </label>
                              </div>
                            </div>
                            <div className="form-group col-md-6">
                              <div className="col-xs-6">
                                <label htmlFor="last_name">
                                  <h4>Last name</h4>
                                </label>
                                <label id="last_name" className="form-control">
                                  {user.lastname}{" "}
                                </label>
                              </div>
                            </div>
                            <div className="form-group col-md-6">
                              <div className="col-xs-6">
                                <label htmlFor="user_name">
                                  <h4>Username</h4>
                                </label>
                                <label id="user_name" className="form-control">
                                  {user.username}{" "}
                                </label>
                              </div>
                            </div>
                            <div className="form-group col-md-6">
                              <div className="col-xs-6">
                                <label htmlFor="email">
                                  <h4>Email</h4>
                                </label>
                                <label id="email" className="form-control">
                                  {user.email}{" "}
                                </label>
                              </div>
                            </div>
                            <div className="form-group col-md-6">
                              <div className="col-xs-12">
                                <br />
                                <button
                                  className="btn btn-lg btn-success"
                                  type="submit"
                                >
                                  <i className="glyphicon glyphicon-ok-sign" />{" "}
                                  Delete User
                                </button>
                              </div>
                            </div>
                          </form>
                          <hr />
                        </div>
                        <div className="tab-pane" id="shipping">
                          <h2 />

                          <hr />
                          <form className="form row">
                            <div className="form-group col-md-6">
                              <div className="col-xs-6">
                                <label htmlFor="city">
                                  <h4>City</h4>
                                </label>
                                <label className="form-control" id="city">
                                  {user.city}
                                </label>
                              </div>
                            </div>

                            <div className="form-group col-md-6">
                              <div className="col-xs-6">
                                <label htmlFor="adress">
                                  <h4>Adress</h4>
                                </label>
                                <label className="form-control" id="adress">
                                  {user.adress}
                                </label>
                              </div>
                            </div>

                            <div className="form-group col-md-6">
                              <div className="col-xs-6">
                                <label htmlFor="zip">
                                  <h4>Zip</h4>
                                </label>
                                <label className="form-control" id="zip">
                                  {user.zip}
                                </label>
                              </div>
                            </div>

                            <div className="form-group col-md-6">
                              <div className="col-xs-6">
                                <label htmlFor="phone">
                                  <h4>Phone</h4>
                                </label>
                                <label className="form-control" id="phone">
                                  {user.phone}
                                </label>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="tab-pane" id="products">
                          <hr />
                          {user.products ? (
                            <>
                              <div className="mb-5">
                                {user.products.map(products => {
                                  return (
                                    <ul
                                      key={products + Math.random(1) * 55}
                                      className="mb-5"
                                    >
                                      {products.map(prod => {
                                        return (
                                          <li key={prod._id}>{prod.title}</li>
                                        );
                                      })}
                                    </ul>
                                  );
                                })}
                              </div>
                            </>
                          ) : null}
                        </div>
                        <div className="tab-pane" id="messages">
                          <h1>User Messages</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </>
        )}
      </MyContext.Consumer>
    );
  }
}

export default UserProfileForAdmin;
