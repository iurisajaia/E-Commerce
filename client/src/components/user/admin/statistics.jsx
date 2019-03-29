import React, { Component } from "react";
import { MyContext } from "../../../State";
import Gender from "../../charts/gender";

class Statistics extends Component {
  static contextType = MyContext;
  state = {};
  render() {
    const user = this.context.state.user;
    const state = this.context.state;
    return (
      <MyContext.Consumer>
        {context => (
          <>
            <div id="adminstatistics" className="tab-pane fade">
              <Gender state={state} />
            </div>
          </>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Statistics;
