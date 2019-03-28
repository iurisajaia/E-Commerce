import React, { Component } from "react";
import { MyContext } from "../../State";

export default class Submail extends Component {
  static contextType = MyContext;
  state = {
    inputValue: ""
  };
  myFunction = () => {
    const data = {
      email: this.state.inputValue
    };
    fetch("/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.error(error);
      });
  };
  inputFn = e => {
    this.setState({ inputValue: e.target.value });
  };

  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <div>
            <input type="email" onChange={e => this.inputFn(e)} />
            <button onClick={this.myFunction}>Subscribe</button>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}

// import { MyContext } from "../../State";

// class Home extends Component {
//   static contextType = MyContext;
