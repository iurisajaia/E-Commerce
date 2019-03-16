import React, { Component } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
import Product from "./product";
class Home extends Component {
  state = {};
  componentDidMount() {
    Promise.all([
      fetch("http://localhost:5000/admin/companies"),
      fetch("http://localhost:5000/admin/categories"),
      fetch("http://localhost:5000/all-product")
    ])
      .then(([companies, categories, products]) => {
        return Promise.all([
          companies.json(),
          categories.json(),
          products.json()
        ]);
      })
      .then(([companies, categories, products]) => {
        this.setState({
          companies: companies.companies,
          categories: categories.categories,
          products
        });
      });
  }
  render() {
    // console.log(this.props);
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <h1 className="my-4">Categories</h1>
              <div className="list-group">
                {this.state.categories
                  ? this.state.categories.map(category => {
                      return (
                        <Link
                          key={category._id}
                          to={`cat/${category.name}`}
                          className="list-group-item"
                        >
                          {category.name}
                        </Link>
                      );
                    })
                  : null}
              </div>
            </div>

            <div className="col-lg-9">
              <div className="row">
                {this.state.products
                  ? this.state.products.map(product => {
                      return (
                        <Product
                          key={product._id}
                          product={product}
                          companies={this.state.companies}
                        />
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
