import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MyContext } from "../../State";
export default class details extends Component {
  static contextType = MyContext;
  state = {};

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

  addToDetails = async () => {
    const productID = this.props.computedMatch.params.id;
    let details = [];
    if (localStorage.getItem("details")) {
      details = JSON.parse(localStorage.getItem("details"));
    } else {
      localStorage.setItem("details", JSON.stringify(details));
    }
    const res = await axios.get("http://localhost:5000/all-product");
    const product = res.data.filter(el => {
      return el._id.match(productID);
    });
    if (details.length < 2) {
      details.push(product[0]);
      localStorage.setItem("details", JSON.stringify(details));
    }
  };

  // Update Input Values
  changeTitle = e => {
    this.setState({
      title: e.target.value
    });
  };
  changeDescription = e => {
    this.setState({
      description: e.target.value
    });
  };
  changePrice = e => {
    this.setState({
      price: e.target.value
    });
  };

  updateProduct = async e => {
    e.preventDefault();

    const data = {
      id: e.target.prodid.value,
      title: e.target.title.value,
      description: e.target.description.value,
      price: e.target.price.value
    };
    fetch("http://localhost:5000/update-product", {
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

  async componentDidMount() {
    const products = await axios.get("http://localhost:5000/all-product");
    const targetProduct = products.data.filter(product => {
      return product._id.match(this.props.computedMatch.params.id);
    });

    this.setState({
      title: targetProduct[0].title,
      description: targetProduct[0].description,
      categories: targetProduct[0].categories,
      company: targetProduct[0].company,
      imageUrl: targetProduct[0].imageUrl,
      price: targetProduct[0].price,
      reviews: targetProduct[0].reviews,
      id: targetProduct[0]._id
    });
    // console.log(this.state);
  }

  render() {
    let product = this.state;
    // console.log(product);
    return (
      <MyContext.Consumer>
        {context => (
          <>
            {product.id ? (
              <div className="container">
                <div className="card mt-4">
                  <img
                    className="card-img-top img-fluid"
                    src={`http://localhost:5000/${product.imageUrl}`}
                    alt={product.title}
                  />
                  <h4>{product.price}$</h4>
                  <h4>seller : {product.company}</h4>
                  <form onSubmit={context.addProductToShopCart}>
                    <input type="hidden" value={product.id} id="product" />

                    {context.state.user && (
                      <>
                        <input
                          type="hidden"
                          id="user"
                          value={context.state.user._id}
                        />
                      </>
                    )}
                    <button className="btn btn-warning">Add To Cart</button>
                  </form>
                  <div className="card-body">
                    <h3 className="card-title">{product.title}</h3>
                    <p className="card-text">{product.description}</p>

                    <hr />

                    {/* product already added message  */}
                    {/* {context.state.productMsg ? (
                    <>
                      <p className="alert alert-danger">
                        {context.state.productMsg}
                      </p>
                    </>
                  ) : null} */}
                    <button onClick={this.addToDetails}>Compare</button>

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
                    {product.reviews.map(review => {
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
                      <input type="hidden" id="product" value={product.id} />
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
                </div>
                {context.state.admin && (
                  <>
                    <hr />
                    <form
                      className="col-md-6 form-group"
                      onSubmit={this.updateProduct}
                    >
                      <input
                        className="form-control"
                        value={product.title}
                        id="title"
                        onChange={this.changeTitle.bind(this)}
                      />
                      <input
                        className="form-control"
                        id="description"
                        onChange={this.changeDescription.bind(this)}
                        value={product.description}
                      />
                      <input
                        className="form-control"
                        id="price"
                        onChange={this.changePrice.bind(this)}
                        value={product.price}
                      />
                      <input type="hidden" value={product.id} id="prodid" />
                      <button className="btn btn-success m-2 db-block">
                        Update
                      </button>
                    </form>

                    {/* // Add company to product */}
                    {/* <div className="row">
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
                  </div> */}
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
