import React, { Component } from 'react'
import axios from 'axios';

export default class details extends Component {
    // componentDidMount(){
    //     console.log(this.props)
    //     let id =this.props.match.params.details;
    //     axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
    //     .then(res =>{
    //      this.setState({
    //          post:res.data
    //      })
    //     })
    // }
    render() {
      return (
        <div className="container">
            <h4>{this.props.match.params.id}</h4>
        </div>
      );
    }
//   render() {
//     const id = this.props.match.params.id;
//     return (
//       <div>
//         <h1> ai sad dagendzra</h1>
//         {/* <h1>{post.title}</h1> */}
//       </div>
//     )
//   }
}
