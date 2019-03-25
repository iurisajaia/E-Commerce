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

  componentDidMount() {
    this.setState({
      cart: this.context.state.carts,
      products: this.context.state.products
    });
  }

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
    // console.log(this.state);
    return (
      <MyContext.Consumer>
        {context => (
          <>
            <div className="pt-5">
              {/* <input
                type="text"
                className="form-control"
                onChange={this.filterProducts}
              /> */}
            </div>
            <div className="container">
              <div className="row">
                {/* <AsideCategories categories={categories} /> */}
                <div className="col-lg-3">
                  <h2 className="my-4">Categories</h2>
                  <div className="list-group">
                    {context.state.categories
                      ? context.state.categories.map(category => {
                          return (
                            <Link
                              to={`cat/${category._id}`}
                              key={category._id}
                              className="list-group-item category-item d-flex justify-content-between align-items-center"
                              value={category._id}
                            >
                              {category.name}
                              <i className="fas fa-angle-double-right" />
                            </Link>
                          );
                        })
                      : null}
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="text-right pt-2 pb-2">
                    <button
                      className="btn btn-info"
                      onClick={() => context.sortPrice("price")}
                    >
                      Sort By Price
                    </button>
                  </div>
                  <div className="row">
                    {context.state.products
                      ? context.state.products.map(product => {
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
