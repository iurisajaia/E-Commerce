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
                          className="row ml-2 mb-1 btn-info messages-row"
                          data-toggle="collapse"
                          data-target={`#${msg.username}`}
                          aria-expanded="false"
                          aria-controls={`#${msg.username}`}
                        >
                          <div className="col-md-1">
                            <i className="far fa-envelope" />
                          </div>
                          <div className="col-md-11">{msg.username}</div>
                        </div>

                        <div className="collapse" id={msg.username}>
                          <div className="card card-body">
                            <p>{msg.messageBody}</p>
                            <form
                              onSubmit={context.adminAnswer}
                              className="mb-2 mt-3"
                            >
                              <input
                                type="hidden"
                                id="userId"
                                value={msg.messageUser}
                              />
                              <input type="hidden" id="msgId" value={msg._id} />
                              <input
                                type="text"
                                className="form-control"
                                id="message"
                                placeholder="Answer"
                              />
                              <button className="btn mt-2 btn-success">
                                Send Answer
                              </button>
                            </form>
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
