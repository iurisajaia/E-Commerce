import React, { Component } from 'react'

export default class Submail extends Component {
    state = {
        inputValue:''
    }
    myFunction = () =>{
        console.log(this.state.inputValue)
      }
      inputFn =(e)=> {
          this.setState({inputValue:e.target.value})
      }
  render() {
    return (
      <div>
         <input type='email' onChange={(e)=>this.inputFn(e)}/>
        <button onClick={this.myFunction}>Subscribe</button>
      </div>
    )
  }
}
