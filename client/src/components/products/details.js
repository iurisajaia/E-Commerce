import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class details extends Component {
  state = {
    product: []
  };
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
  addToCartHandler = async () => {
    const productID = this.props.computedMatch.params.id;
    // const token = localStorage.getItem("token");
    let cart = []
    if(localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }else {
      // cart = []
      localStorage.setItem('cart',JSON.stringify(cart));
    }
    const res = await axios.get('http://localhost:5000/all-product');
    const product = res.data.filter(el => {
      return el._id == productID;
    });
    cart.push(product[0]);
    localStorage.setItem('cart',JSON.stringify(cart))
  };

  async componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/me", {
          headers: {
            "x-auth-token": token
          }
        })
        .then(res => {
          this.setState({ user: res.data.user, alluser: res.data.alluser });
        })
        .catch(err => {
          console.log(err);
        });
    }

    const products = await axios.get("http://localhost:5000/all-product");
    const targetProduct = products.data.filter(product => {
      return product._id.match(this.props.computedMatch.params.id);
    });
<<<<<<< HEAD
=======

    // var filteredCompanies = [];
    // for (let x = 0; x < targetProduct[0].companies.length; x++) {
    //   for (let i = 0; i < this.props.companies.length; i++) {
    //     if (
    //       targetProduct[0].companies[x].company == this.props.companies[i]._id
    //     ) {
    //       filteredCompanies.push(this.props.companies[i]);
    //     }
    //   }
    // }
    // , sellers: filteredCompanies

>>>>>>> b6eef8e7eff87e947b4e6b2efde015c49b5d4db5
    this.setState({ product: targetProduct });
  }

  render() {
    // var sellers = this.state.sellers;
    // console.log(sellers);
    var admin = this.state.alluser;
    var companies;
    if (this.props.companies) {
      companies = this.props.companies;
    }
    // console.log(companies);
    let { product } = this.state;
    const pageInfo = product.length ? (
      <div className="container">
        <div className="card mt-4">
          <img
            className="card-img-top img-fluid"
            src={product[0].imageUrl}
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
          {localStorage.getItem("token") ? (
            <div>
              <button className="addToCartBtn" onClick={this.addToCartHandler}>
                Add to Cart
              </button>
            </div>
          ) : null}
        </div>
        {admin && (
          <>
            <hr />
            <div className="row">
              <form
                className="col-md-6 form-group"
                onSubmit={this.addCompanyToProduct}
              >
                {companies && (
                  <select id="company" className="custom-select">
                    {companies.map(company => {
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
                <input type="hidden" id="product" value={product[0]._id} />
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
      <div>Epmty List</div>
    );

    return <>{pageInfo}</>;
  }
}
