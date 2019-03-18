import React, { Component } from "react";
import { Link } from "react-router-dom";
import Product from "./product";
class Home extends Component {
  state = {};

  render() {
    var companies = this.props.companies;
    var categories = this.props.categories;
    var products = this.props.products;
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <h1 className="my-4">Categories</h1>
              <div className="list-group">
                {categories
                  ? categories.map(category => {
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
                {products
                  ? products.map(product => {
                      return (
                        <Product
                          key={product._id}
                          product={product}
                          companies={companies}
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
