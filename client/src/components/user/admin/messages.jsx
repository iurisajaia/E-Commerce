import React, { Component } from "react";
import { MyContext } from "../../../State";

class Messages extends Component {
  static contextType = MyContext;
  state = {};
  render() {
    const user = this.context.state.user;
    console.log(user);
    return (
      <MyContext.Consumer>
        {context => (
          <>
            <div id="adminmessages" className="tab-pane fade">
              {user && (
                <>
                  {user.messages.inbox.map(msg => {
                    return (
                      <div key={msg._id} className="row">
                        <div className="col-md-3">{msg.messageUser}</div>
                        <div className="col-md-9">{msg.messageBody}</div>
                      </div>
                    );
                  })}
                </>
              )}
              {/* {user ? <>{user.fistname}</> : <p> No Messages </p>} */}
            </div>
          </>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Messages;
