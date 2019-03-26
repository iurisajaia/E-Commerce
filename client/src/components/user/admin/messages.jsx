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
                      <div key={msg._id}>
                        <div
                          className="row"
                          data-toggle="collapse"
                          data-target={`#${msg._id}`}
                          aria-expanded="false"
                          aria-controls={`#${msg._id}`}
                        >
                          <div className="col-md-3">
                            {msg.status == false ? "Unread" : "Readed"}
                          </div>
                          <div className="col-md-9">{msg.messageBody}</div>
                        </div>

                        <div className="collapse" id={msg._id}>
                          <div className="card card-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. Nihil
                            anim keffiyeh helvetica, craft beer labore wes
                            anderson cred nesciunt sapiente ea proident.
                          </div>
                        </div>
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
