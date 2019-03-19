import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
class Products extends Component {
  state = {};

  addProduct = event => {
    event.preventDefault();
    const data = new FormData();

    data.append("title", event.target.title.value);
    data.append("description", event.target.description.value);
    data.append("price", event.target.price.value);
    data.append("categories", event.target.categories.value);
    data.append("company", event.target.company.value);
    data.append("tags", event.target.tags.value);
    data.append("imageUrl", event.target.imageUrl.files[0]);

    // for (var pair of data.entries()) {
    //   console.log(pair[0] + " " + pair[1]);
    // }

    axios({
      method: "POST",
      url: "http://localhost:5000/add-product",
      data: data,
      config: { headers: { "Content-Type": "multpart/form-data" } }
    })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    var companies = this.props.companies;

    var categories = this.props.categories;

    var products = this.props.products;

    return (
      <>
        <div id="menu1" className="tab-pane fade">
          <form className="form-group" onSubmit={this.addProduct}>
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
        </div>
      </>
    );
  }
}

export default Products;
