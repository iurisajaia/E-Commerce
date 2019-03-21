import React, { Component } from "react";
import { Link } from "react-router-dom";
// import AsideCategories from "./asidecategories";
import Product from "./product";

import { MyContext } from "../../State";

class Home extends Component {
  static contextType = MyContext;

  state = {
    search: "",
    category: ""
  };

  // Handle filter with search input
  filterProducts = e => {
    this.setState({ search: e.target.value });
  };

  render() {
    var productsup = this.context.state.products;

    if (productsup) {
      var filteredProds = productsup.filter(product => {
        return product.title
          .toLowerCase()
          .includes(this.state.search.toLowerCase());
      });
    }

    return (
      <MyContext.Consumer>
        {context => (
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
                    {context.state.categories
                      ? context.state.categories.map(category => {
                          return (
                            <Link
                              to={`cat/${category._id}`}
                              key={category._id}
                              className="list-group-item"
                              value={category._id}
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
                              // companies={context.state.companies}
                            />
                          );
                        })
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Home;
