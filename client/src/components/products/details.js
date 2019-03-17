import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class details extends Component {
  state = {
    product: []
  };

  addToCartHandler = () => {
    const productID = this.props.computedMatch.params.id;
    const token = localStorage.getItem('token');
    axios.post('http://localhost:5000/addtocart', {
      productID,
      token
    })
      .then(function (response) {
        // const {data} = response;
        // const targetProduct = data.filter(product => product._id === ID);
        // if(targetProduct) {
        //   console.log(targetProduct)
        // }
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async componentDidMount() {
    const products = await axios.get("http://localhost:5000/all-product");
    const targetProduct = products.data.filter(product => {
      return product._id == this.props.computedMatch.params.id;
    });
    // const filteredCompanies = this.props.companies.filter(company => {
    //   return targetProduct.companies._id == this.props.companies._id;
    // });
    console.log(targetProduct);
    this.setState({ product: targetProduct });
  }

  render() {
    // console.log(this.props.companies);
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
            <p className="card-text">{product[0].description}</p>
            {product[0].tags.map(tag => {
              return (
                <Link
                  to={tag}
                  key={Math.random()}
                  className="badge badge-primary ml-1"
                >
                  {tag}
                </Link>
              );
            })}
            <hr />
            {product[0].companies.map(company => {
              return (
                <p key={company._id} className="badge badge-primary ml-1">
                  {company._id} -{company.price}
                </p>
              );
            })}

            {/* <span className="text-warning">
              &#9733; &#9733; &#9733; &#9733; &#9734;
            </span>
            4.0 stars */}
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
            <Link to="/products" className="btn btn-success">
              Back To Products
            </Link>
          </div>
          {localStorage.getItem('token') ? (
            <div>
            <button className='addToCartBtn' onClick={this.addToCartHandler}>Add to Cart</button>
          </div>
          ): null}
          
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
