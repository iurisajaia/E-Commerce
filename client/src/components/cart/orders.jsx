import React, { Component } from "react";
import { MyContext } from "../../State";
class Orders extends Component {
  state = {};
  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <>
            <br />
            <br />
            {context.state.userorders &&
            context.state.user &&
            !context.state.admin ? (
              <>
                {context.state.userorders.map(order => {
                  return (
                    <div className="container">
                      {order.products.map(prod => {
                        return (
                          <div className="row mb-5" key={prod.date}>
                            <div className="col-md-3 col-sm-12 cart-image-section">
                              <img
                                className="img-thumbnail"
                                src={prod.imageUrl}
                                alt=""
                              />
                            </div>
                            <div className="col-md-9 col-sm-12">
                              <h4 className="cart-prod_title">
                                <i class="fas fa-tshirt" />
                                &nbsp;&nbsp;&nbsp;
                                {prod.title}
                              </h4>
                              <hr className="custom-line" />
                              <h4 className="cart-prod_title">
                                <i class="fab fa-creative-commons-by" />
                                &nbsp;&nbsp;&nbsp;{prod.company}
                              </h4>{" "}
                              <h4 className="cart-prod_title">
                                &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;
                                <i class="fas fa-dollar-sign" />{" "}
                                &nbsp;&nbsp;&nbsp;
                                {prod.price}
                              </h4>
                              <hr className="custom-line" />
                              <h4 className="cart-prod_title">
                                <i class="fas fa-luggage-cart" />
                                &nbsp; quantity : &nbsp;&nbsp;&nbsp;
                                {prod.total / prod.price}
                              </h4>
                              <hr className="custom-line" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </>
            ) : null}
            {context.state.admin && context.state.orders ? (
              <>
                <div className="container">
                  Orders For Admin
                  {context.state.orders.map(order => {
                    return (
                      <div key={order._id}>
                        {order.products.map(prod => {
                          return (
                            <form className="row mb-5" key={prod.date}>
                              <div className="col-md-3 col-sm-12 cart-image-section">
                                <img
                                  className="img-thumbnail"
                                  src={prod.imageUrl}
                                  alt=""
                                />
                              </div>
                              <div className="col-md-9 col-sm-12">
                                <h4 className="cart-prod_title">
                                  <i class="far fa-user" />
                                  &nbsp;&nbsp;&nbsp;
                                  {order.user.firstname} {order.user.lastname}
                                </h4>
                                <hr className="custom-line" />
                                <h4 className="cart-prod_title">
                                  <i class="fas fa-tshirt" />
                                  &nbsp;&nbsp;&nbsp;
                                  {prod.title}
                                </h4>
                                <hr className="custom-line" />
                                <h4 className="cart-prod_title">
                                  <i class="fab fa-creative-commons-by" />
                                  &nbsp;&nbsp;&nbsp;{prod.company}
                                </h4>{" "}
                                <h4 className="cart-prod_title">
                                  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                                  &nbsp;&nbsp;&nbsp;
                                  <i class="fas fa-dollar-sign" />{" "}
                                  &nbsp;&nbsp;&nbsp;
                                  {prod.price}
                                  &nbsp;&nbsp;&nbsp;
                                  <i class="fas fa-luggage-cart" />
                                  &nbsp; quantity : &nbsp;&nbsp;&nbsp;
                                  {prod.total / prod.price}
                                </h4>
                                <hr className="custom-line" />
                                <input type="hidden" id="deliveredprod" />
                                <button
                                  onClick={context.acceptDelivery}
                                  type="submit"
                                  data-prodid={order._id}
                                  data-product={prod._id}
                                  data-userid={order.user._id}
                                  className="btn btn-success"
                                >
                                  Delivery
                                </button>
                                <button
                                  onClick={context.deleteOrder}
                                  data-prodid={order._id}
                                  data-userid={order.user._id}
                                  className="btn btn-danger ml-1"
                                >
                                  Delete
                                </button>
                                <hr className="custom-line" />
                              </div>
                            </form>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </>
            ) : null}
          </>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Orders;
