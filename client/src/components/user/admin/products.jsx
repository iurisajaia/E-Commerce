import React, { Component } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
class Products extends Component {
  state = {};

  addProduct = event => {
    event.preventDefault();
    const data = {
      title: event.target.title.value,
      description: event.target.description.value,
      price: event.target.price.value,
      categories: event.target.categories.value,
      company: event.target.company.value,
      tags: event.target.tags.value
    };

    fetch("http://localhost:5000/add-product", {
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

  componentDidMount() {
    Promise.all([
      fetch("http://localhost:5000/admin/companies"),
      fetch("http://localhost:5000/admin/categories")
    ])
      .then(([companies, categories]) => {
        return Promise.all([companies.json(), categories.json()]);
      })
      .then(([companies, categories]) => {
        this.setState({ companies, categories });
      });
  }
  render() {
    var companies;
    var categories;
    var products;
    if (this.state.companies) {
      companies = this.state.companies.companies;
      // console.log(companies);
    }

    if (this.state.categories) {
      categories = this.state.categories.categories;
      // console.log(categories);
    }

    if (this.props.products) {
      products = this.props.products;
    }
    return (
      <>
        <div id="menu1" className="tab-pane fade">
          <form className="form-group" onSubmit={this.addProduct}>
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
            <input
              type="text"
              placeholder="tags"
              id="tags"
              className="form-control"
            />
            {categories && (
              <select id="categories" className="custom-select">
                {categories.map(category => {
                  return (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            )}
            {companies && (
              <select id="company" className="custom-select">
                {companies.map(company => {
                  return (
                    <option key={company._id} value={company._id}>
                      {company.name}
                    </option>
                  );
                })}
              </select>
            )}
            <input
              type="number"
              placeholder="price"
              id="price"
              className="form-control"
            />
            <button className="btn btn-success">Add Product</button>
          </form>
        </div>

        <div className="row m-3">
          {products.map(prod => {
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
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default Products;
