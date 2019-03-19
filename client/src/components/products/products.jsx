import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import AsideCategories from "./asidecategories";
import Product from "./product";
class Home extends Component {
  state = {
    search: "",
    category: ""
  };

  // Handle filter with search input
  filterProducts = e => {
    this.setState({ search: e.target.value });
  };

  render() {
    // filter products with search
    var productsup = this.props.products;
    if (productsup) {
      var filteredProds = productsup.filter(product => {
        return product.title
          .toLowerCase()
          .includes(this.state.search.toLowerCase());
      });
    }

    var companies = this.props.companies;
    var categories = this.props.categories;

    return (
      <>
        <div>
          <input
            type="text"
            className="form-control"
            onChange={this.filterProducts}
          />
        </div>
        <div className="container">
          <div className="row">
            {/* <AsideCategories categories={categories} /> */}
            <div className="col-lg-3">
              <h1 className="my-4">Categories</h1>
              <div className="list-group">
                {categories
                  ? categories.map(category => {
                      return (
                        <button
                          to={`cat/${category._id}`}
                          key={category._id}
                          className="list-group-item"
                          value={category._id}
                        >
                          {category.name}
                        </button>
                      );
                    })
                  : null}
              </div>
            </div>
            <div className="col-lg-9">
              <div className="row">
                {filteredProds
                  ? filteredProds.map(product => {
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
