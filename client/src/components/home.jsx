import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Product from './product';
class Home extends Component {
  state = {
    posts:[]
  }
  componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(res =>{
            console.log(res)
            this.setState({
                posts:res.data.slice(0,20)
            })
        })
    }
  state = {};
  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-4">Hello, world!</h1>
        <p className="lead">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr className="my-4" />
        <p>
          It uses utility classNamees for typography and spacing to space
          content out within the larger container.
        </p>
        <Link
          to="/registration"
          className="btn btn-primary btn-lg"
          role="button"
        >
          Registration
        </Link>
        <Link to="/login" className="btn btn-primary btn-lg ml-4" role="button">
          Login
        </Link>
        {(this.state.posts)? (this.state.posts.map(post => {
          {/* console.log(post) */}
          return (<Product key={post.userId} post={post}/>)
        })) : null}
      </div>
    );
  }
}

export default Home;
