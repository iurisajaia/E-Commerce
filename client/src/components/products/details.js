import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
  state = {
    product: []
  };
  async componentDidMount() {
    const products = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const targetProduct = products.data.filter(product => {
      return product.id == this.props.match.params.id;
    });
    this.setState({ product: targetProduct });
  }

  render() {
    let { product } = this.state;
    const pageInfo = product.length ? (
      <div className="container">
        <div className="card mt-4">
          <img
            className="card-img-top img-fluid"
            src="http://placehold.it/900x400"
            alt={product[0].title}
          />
          <div className="card-body">
            <h3 className="card-title">{product[0].title}</h3>
            <h4>$24.99</h4>
            <p className="card-text">{product[0].body}</p>
            <span className="text-warning">
              &#9733; &#9733; &#9733; &#9733; &#9734;
            </span>
            4.0 stars
          </div>
        </div>

        <div className="card card-outline-secondary my-4">
          <div className="card-header">Product Reviews</div>
          <div className="card-body">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et
              enim aperiam inventore, similique necessitatibus neque non!
              Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi
              mollitia, necessitatibus quae sint natus.
            </p>
            <small className="text-muted">Posted by Anonymous on 3/1/17</small>
            <hr />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et
              enim aperiam inventore, similique necessitatibus neque non!
              Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi
              mollitia, necessitatibus quae sint natus.
            </p>
            <small className="text-muted">Posted by Anonymous on 3/1/17</small>
            <hr />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et
              enim aperiam inventore, similique necessitatibus neque non!
              Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi
              mollitia, necessitatibus quae sint natus.
            </p>
            <small className="text-muted">Posted by Anonymous on 3/1/17</small>
            <hr />
            <Link to="#" className="btn btn-success">
              Leave a Review
            </Link>
          </div>
        </div>
      </div>
    ) : (
      <div>Epmty List</div>
    );

    return <>{pageInfo}</>;
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
