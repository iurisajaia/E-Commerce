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
                            <li key={prod.date} className="list-group-item">
                              title : {prod.title} <br />
                              description : {prod.description} <br />
                              price : {prod.price} <br />
                              quantity : {prod.total / prod.price} <br />
                              you pay : {prod.total} <br />
                              status : {order.status}
                            </li>
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
                    <div key={order._id} className="row">
                      <ul className="list-group col-md-6">
                        {order.products.map(prod => {
                          return (
                            <li key={prod.date} className="list-group-item">
                              title : {prod.title} <br />
                              description : {prod.description} <br />
                              price : {prod.price} <br />
                              quantity : {prod.total / prod.price} <br />
                              you pay : {prod.total} <br />
                              status : {order.status} <br />
                              User : {order.user.firstname}
                            </li>
                          );
                        })}
                      </ul>
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
