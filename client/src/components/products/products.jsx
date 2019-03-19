import React, { Component } from "react";
import { Link } from "react-router-dom";
import Product from "./product";
class Home extends Component {
  state = {
    dogs: [{ name: "max" }, { name: "not" }, { name: "alex" }],
    search: ""
  };
  componentWillReceiveProps(props) {
    this.setState({ products: props.products });
  }

  filterProducts = e => {
    this.setState({ search: e.target.value });
  };
  render() {
    var productsup = this.state.products;
    if (productsup) {
      var filteredProds = productsup.filter(product => {
        return product.title
          .toLowerCase()
          .includes(this.state.search.toLowerCase());
      });
    }

    var companies = this.props.companies;
    var categories = this.props.categories;
    var products = this.props.products;

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
