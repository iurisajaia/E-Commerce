import React, { Component } from "react";
import { MyContext } from "../../../State";
import All from "../../charts/all";
import Sold from "../../charts/sold";

class Statistics extends Component {
  static contextType = MyContext;
  state = {};
  render() {
    const state = this.context.state;
    return (
      <MyContext.Consumer>
        {context => (
          <>
            <div id="adminstatistics" className="tab-pane fade">
              <All state={state} />
              <Sold state={state} />
            </div>
          </>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Statistics;
