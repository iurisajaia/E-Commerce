import React, { Component } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import { MyContext } from "../../../State";
class Products extends Component {
  state = {};

  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <>
            <div id="menu1" className="tab-pane fade">
              <form className="form-group" onSubmit={context.addProduct}>
                <input type="file" id="imageUrl" name="imageUrl" />
                <input
                  type="text"
                  placeholder="title"
                  id="title"
                  className="form-control"
                />
                <input
                  type="text"
                  id="description"
                  placeholder="description"
                  className="form-control"
                />
                {context.state.categories && (
                  <select id="categories" className="custom-select">
                    {context.state.categories.map(category => {
                      return (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                )}
                {context.state.companies && (
                  <select id="company" className="custom-select">
                    {context.state.companies.map(company => {
                      return (
                        <option key={company._id} value={company.name}>
                          {company.name}
                        </option>
                      );
                    })}
                  </select>
                )}
                <input type="number" className="form-control" id="price" />

                <button className="btn btn-success">Add Product</button>
              </form>

              <div className="row m-3">
                {context.state.products.map(prod => {
                  return (
                    <div className="col-lg-4 col-md-6 mb-4" key={prod._id}>
                      <div className="card h-100">
                        <div className="card-body">
                          <h4 className="card-title">
                            <Link to={/details/ + prod._id}>{prod.title}</Link>
                          </h4>
                          <h5>$24.99</h5>
                          <p className="card-text">{prod.description}</p>
                        </div>
                        <button
                          className="btn btn-danger"
                          value={prod._id}
                          onClick={context.removeProduct}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Products;
