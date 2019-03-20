import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
export const MyContext = React.createContext();

class MyProvider extends Component {
  state = {};

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/me", {
          headers: {
            "x-auth-token": token
          }
        })
        .then(res => {
          this.setState({
            user: decoded,
            active: true,
            admin: res.data.alluser
          });
        })
        .catch(err => {
          console.log(err);
        });
      var decoded = jwt_decode(token);
      //   this.setState({ user: decoded,  });
    }

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

  //   Add New Company
  addCompany = event => {
    event.preventDefault();
    const data = {
      name: event.target.company.value
    };
    event.target.company.value = "";

    fetch("http://localhost:5000/add-company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        var companies = this.state.companies;
        companies.push(res);
        this.setState({ companies });
      })
      .catch(error => {
        console.error(error);
      });
  };

  // Add New Category
  addCategory = event => {
    event.preventDefault();
    const data = {
      name: event.target.category.value
    };
    event.target.category.value = "";
    fetch("http://localhost:5000/add-category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        var categories = this.state.categories;
        categories.push(res);
        this.setState({ categories });
      })
      .catch(error => {
        console.error(error);
      });
  };

  // Add New Products
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
        var products = this.state.products;
        products.push(res.data.newProduct);
        this.setState({ products });
      })
      .catch(error => {
        console.error(error);
      });
  };

  // Add review to product
  handleNewReview = event => {
    event.preventDefault();

    const data = {
      review: event.target.review.value,
      product: event.target.product.value,
      user: event.target.user.value,
      userName: event.target.userName.value
    };

    fetch("http://localhost:5000/add-new-review", {
      method: "PUT",
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

  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          addCompany: this.addCompany,
          addCategory: this.addCategory,
          addProduct: this.addProduct,
          handleNewReview: this.handleNewReview
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;
