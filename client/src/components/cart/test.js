import React, { Component } from "react";
import { MyContext } from "../../State";
export default class test extends Component {
  static contextType = MyContext;
  state = {
    user: {}
  };

  componentDidMount() {
    this.setState({ user: this.context.state.user });
  }
  render() {
    console.log(this.state);
    return (
      <MyContext.Consumer>
        {context => (
          <>
            <h1>test</h1>
          </>
        )}
      </MyContext.Consumer>
    );
  }
}
