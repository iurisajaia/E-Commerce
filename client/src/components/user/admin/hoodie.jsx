import React, { Component } from "react";
import UserCard from "../usercard";
import { MyContext } from "../../../State";
class Users extends Component {
    state = {};
    render() {
        // console.log(this.context.state)
        return (
            <MyContext.Consumer>
                {context => (
                    <>
                        <div id="hoodies" className="tab-pane fade in active show">
                            <div className="row">
                                {context.state.hoodies.hoodies.map(order => {
                                    return (

                                        <div className="col-md-4" key={order}>
                                            <h3>{order.hoodie}</h3>
                                            <h3>{order.logo}</h3>

                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </>
                )}
            </MyContext.Consumer>
        );
    }
}

export default Users;
