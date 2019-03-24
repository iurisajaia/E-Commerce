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
                    <div key={order._id}>
                      <ul className="list-group">
                        {order.products.map(prod => {
                          return (
                            <div key={prod.date} className="row">
                              <div className="col-md-2">
                                title :<br /> {prod.title}
                              </div>
                              <div className="col-md-2">
                                Description : <br />
                                {prod.description}
                              </div>
                              <div className="col-md-2">
                                <img
                                  src={prod.imageUrl}
                                  style={{ width: "160px", heigth: "160px" }}
                                  alt={prod.title}
                                />
                              </div>
                              <div className="col-md-2">
                                price : {prod.price}
                                <br />
                                quantity : {prod.total / prod.price}
                              </div>
                              <div className="col-md-2">
                                user pay : <br /> {prod.total}$
                              </div>
                              <div className="col-md-">
                                Seller : {prod.company}
                              </div>
                            </div>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </>
            ) : null}
            {context.state.admin && context.state.orders ? (
              <>
                Orders For Admin
                {context.state.orders.map(order => {
                  return (
                    <div key={order._id}>
                      {order.products.map(prod => {
                        return (
                          <form key={prod.date} className="row">
                            <div className="col-md-2">
                              User : <br /> {order.user.firstname}{" "}
                              {order.user.lastname}
                            </div>
                            <div className="col-md-2">
                              title :<br /> {prod.title}
                              Seller : {prod.company}
                            </div>
                            <div className="col-md-2">
                              <img
                                src={prod.imageUrl}
                                style={{ width: "160px", heigth: "160px" }}
                                alt={prod.title}
                              />
                            </div>
                            <div className="col-md-2">
                              price : {prod.price}
                              <br />
                              quantity : {prod.total / prod.price}
                            </div>
                            <div className="col-md-2">
                              user pay : <br /> {prod.total}$
                            </div>
                            <div className="col-md-2">
                              <input type="hidden" id="deliveredprod" />
                              <button
                                onClick={context.acceptDelivery}
                                type="submit"
                                data-prodid={order._id}
                                data-userid={order.user._id}
                                className="btn btn-success"
                              >
                                Delivery
                              </button>
                            </div>
                          </form>
                        );
                      })}
                    </div>
                  );
                })}
              </>
            ) : null}
          </>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Orders;
