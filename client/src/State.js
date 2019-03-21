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
      fetch("http://localhost:5000/all-product"),
      fetch("http://localhost:5000/get-all-cart")
    ])
      .then(([companies, categories, products, carts]) => {
        return Promise.all([
          companies.json(),
          categories.json(),
          products.json(),
          carts.json()
        ]);
      })
      .then(([companies, categories, products, carts]) => {
        this.setState({
          companies: companies.companies,
          categories: categories.categories,
          products,
          carts
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
    data.append("categories", event.target.categories.value);
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

  // Add Product To Shopping Cart
  addProductToShopCart = e => {
    e.preventDefault();
    const data = {
      user: e.target.user.value,
      product: e.target.product.value,
      company: e.target.company.value,
      price: e.target.price.value,
      count: 1
    };
    fetch("http://localhost:5000/add-product-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        var carts = this.state.carts;
        carts.push(res);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // remove Product
  removeProduct = e => {
    e.preventDefault();
    const data = {
      id: e.target.value
    };
    fetch("http://localhost:5000/remove-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.error(error);
      });
    e.target.parentElement.parentElement.remove();
  };
  // Edit Product (Name/Description)
  editProduct = e => {};

  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          addCompany: this.addCompany,
          addCategory: this.addCategory,
          addProduct: this.addProduct,
          handleNewReview: this.handleNewReview,
          addProductToShopCart: this.addProductToShopCart,
          removeProduct: this.removeProduct
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;
