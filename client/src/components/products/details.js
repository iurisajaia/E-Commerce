import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MyContext } from "../../State";
export default class details extends Component {
  state = {
    product: []
  };

  //  Add New Company To Product
  addCompanyToProduct = event => {
    event.preventDefault();

    const data = {
      company: event.target.company.value,
      price: event.target.price.value,
      product: event.target.product.value
    };

    fetch("http://localhost:5000/add-new-company", {
      method: "PUT",
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

  // Add product in cart
  addToCartHandler = async () => {
    const productID = this.props.computedMatch.params.id;
    // const token = localStorage.getItem("token");
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    } else {
      // cart = []
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    const res = await axios.get("http://localhost:5000/all-product");
    const product = res.data.filter(el => {
      return el._id.match(productID);
    });
    cart.push(product[0]);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  async componentDidMount() {
    const products = await axios.get("http://localhost:5000/all-product");
    const targetProduct = products.data.filter(product => {
      return product._id.match(this.props.computedMatch.params.id);
    });
    this.setState({ product: targetProduct });
  }

  render() {
    let { product } = this.state;
    return (
      <MyContext.Consumer>
        {context => (
          <>
            {product.length ? (
              <div className="container">
                <div className="card mt-4">
                  <img
                    className="card-img-top img-fluid"
                    src={`http://localhost:5000/${product[0].imageUrl}`}
                    alt={product[0].title}
                  />
                  <div className="card-body">
                    <h3 className="card-title">{product[0].title}</h3>
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
                        <div key={company._id} className="row mb-1">
                          <div className="col-4">seller : {company.name} </div>
                          <div className="col-4">price : ${company.price}</div>
                          <div className="col-4">
                            <button className="btn btn-warning btn-sm">
                              Add To Cart
                            </button>
                          </div>
                        </div>
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

                  {/* Product */}
                  <div className="card-body">
                    {product[0].reviews.map(review => {
                      return (
                        <div key={review._id}>
                          <p> {review.review}</p>
                          <small className="text-muted">
                            Posted by {review.userName} on 3/1/17
                          </small>
                        </div>
                      );
                    })}

                    <hr />
                    <Link to="/products" className="btn btn-success">
                      Back To Products
                    </Link>
                  </div>
                  <br />
                  <br />
                  <br />
                  <hr />
                  {/* Add Review */}
                  <div className="form-group">
                    <form
                      className="form-group"
                      onSubmit={context.handleNewReview}
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add Review"
                        id="review"
                      />
                      <input
                        type="hidden"
                        id="product"
                        value={product[0]._id}
                      />
                      {context.state.user && (
                        <>
                          <input
                            type="hidden"
                            id="user"
                            value={context.state.user._id}
                          />
                          <input
                            type="hidden"
                            id="userName"
                            value={context.state.user.firstname}
                          />
                        </>
                      )}
                      <button className="btn btn-warning btn-block">
                        Add Review
                      </button>
                    </form>
                  </div>
                  {/* / Add Review */}
                  <hr />

                  {/* Add TO Cart */}
                  {context.state.user ? (
                    <div>
                      <button
                        className="addToCartBtn"
                        onClick={this.addToCartHandler}
                      >
                        Add to Cart
                      </button>
                    </div>
                  ) : null}
                </div>
                {context.state.admin && (
                  <>
                    <hr />

                    {/* // Add company to product */}
                    <div className="row">
                      <form
                        className="col-md-6 form-group"
                        onSubmit={this.addCompanyToProduct}
                      >
                        {context.state.companies && (
                          <select id="company" className="custom-select">
                            {context.state.companies.map(company => {
                              return (
                                <option
                                  key={company.name}
                                  type="radio"
                                  value={company.name}
                                  name="company"
                                >
                                  {company.name}
                                </option>
                              );
                            })}
                          </select>
                        )}
                        <input
                          type="hidden"
                          id="product"
                          value={product[0]._id}
                        />
                        <input
                          type="number"
                          className="form-control mt-1 mb-1"
                          id="price"
                        />
                        <button type="submit" className="btn btn-success">
                          Add Company
                        </button>
                      </form>
                    </div>
                  </>
                )}
              </div>
            ) : (
              // </div>
              <div>Epmty List</div>
            )}
          </>
        )}
      </MyContext.Consumer>
    );
  }
}
