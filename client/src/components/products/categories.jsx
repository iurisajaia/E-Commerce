import React, { Component } from "react";
import { Link } from "react-router-dom";
import Product from "./product";
import { MyContext } from "../../State";

class Categories extends Component {
  static contextType = MyContext;

  state = {};
  render() {
    var productsup = this.context.state.products;
    if (productsup) {
      var filteredProds = productsup.filter(product => {
        return product.categories
          .toLowerCase()
          .includes(this.props.computedMatch.params.id.toLowerCase());
      });
    }
    // console.log(productsup, " ", this.props.computedMatch.params.id);

    return (
      <MyContext.Consumer>
        {context => (
          <>
            <div style={{ marginTop: 50 }} />
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
                              to={`${category._id}`}
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

export default Categories;
