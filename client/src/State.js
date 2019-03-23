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
            admin: res.data.alluser,
            cartsadmin: res.data.allcart
          });
        })
        .catch(err => {
          console.log(err);
        });
      var decoded = jwt_decode(token);
      this.setState({
        user: decoded,
        cartTotal: decoded.total
      });
    }

    Promise.all([
      fetch("http://localhost:5000/admin/companies"),
      fetch("http://localhost:5000/admin/categories"),
      fetch("http://localhost:5000/all-product"),
      fetch("http://localhost:5000/get-all-cart"),
      fetch("http://localhost:5000/get-all-orders")
    ])
      .then(([companies, categories, products, carts, orders]) => {
        return Promise.all([
          companies.json(),
          categories.json(),
          products.json(),
          carts.json(),
          orders.json()
        ]);
      })
      .then(([companies, categories, products, carts, orders]) => {
        if (this.state.user) {
          var filtered = carts.filter(cart => {
            return cart.user.match(this.state.user._id);
          });

          var filteredprods = [];
          for (let i = 0; i < products.length; i++) {
            for (let a = 0; a < filtered.length; a++) {
              if (products[i]._id.match(filtered[a].product)) {
                products[i].total = products[i].price * filtered[a].quantity;
                filteredprods.push(products[i]);
              }
            }
          }

          // Count Products Prices
          var numbers = [];
          for (let x = 0; x < filteredprods.length; x++) {
            numbers.push(filteredprods[x].total);
            var total = 0;
            for (var i in numbers) {
              total += numbers[i];
            }
          }

          // Filter Orders
          var filteredOrders = [];
          for (let o = 0; o < orders.length; o++) {
            for (let u = 0; u < this.state.user.orders.length; u++) {
              if (orders[o]._id.match(this.state.user.orders[u])) {
                filteredOrders.push(orders[o]);
              }
            }
          }

          this.setState({
            carts: filteredprods,
            cartTotal: total,
            userorders: filteredOrders
          });
        }
        this.setState({
          companies: companies.companies,
          categories: categories.categories,
          products,
          orders
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
    data.append("company", event.target.company.value);
    data.append("price", event.target.price.value);

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
        window.setTimeout(window.location.reload(), 2000);
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
      product: e.target.product.value
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
        if (!res.msg) {
          res.total = res.total * res.price;
          var carts = this.state.carts;
          carts.push(res);

          // Count Products Prices
          var numbers = [];
          for (let x = 0; x < carts.length; x++) {
            var total = 0;
            numbers.push(carts[x].total);
            for (var i in numbers) {
              total += numbers[i];
            }
          }

          this.setState({ carts, cartTotal: total });
        }
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
        console.log(res);
      })
      .catch(error => {
        console.error(error);
      });
    e.target.parentElement.parentElement.remove();
  };

  // Edit Product (Name/Description)
  editProduct = e => {};

  // remove product from cart
  removeProductFromCart = e => {
    e.preventDefault();
    const data = {
      user: e.target.cartUser.value,
      product: e.target.cartId.value
    };
    fetch("http://localhost:5000/remove-product-from-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        var defiltered = [];
        for (var r = 0; r < this.state.carts.length; r++) {
          if (this.state.carts[r]._id !== res.product) {
            defiltered.push(this.state.carts[r]);
          }
        }
        // Count Products Prices
        var nums = [];
        for (let x = 0; x < defiltered.length; x++) {
          nums.push(defiltered[x].total);
          var tot = 0;
          for (var i in nums) {
            tot += nums[i];
          }
        }
        this.setState({ carts: defiltered, cartTotal: tot });
      })
      .catch(error => {
        console.error(error);
      });
  };

  // Update Cart
  updateCart = e => {
    e.preventDefault();
    const data = {
      product: e.target.dataset.prodid,
      user: e.target.dataset.userid,
      quantity: e.target.value
    };
    fetch("http://localhost:5000/update-cart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        var changedfiltered = [];
        for (let i = 0; i < this.state.products.length; i++) {
          for (let a = 0; a < res.length; a++) {
            if (this.state.products[i]._id.match(res[a].product)) {
              this.state.products[i].total =
                this.state.products[i].price * res[a].quantity;
              changedfiltered.push(this.state.products[i]);
            }
          }
        }

        // Count Products Prices
        var numbers = [];
        for (let x = 0; x < changedfiltered.length; x++) {
          numbers.push(changedfiltered[x].total);
          var total = 0;
          for (var i in numbers) {
            total += numbers[i];
          }
        }

        this.setState({ carts: changedfiltered, cartTotal: total });
      })
      .catch(error => {
        console.error(error);
      });
  };

  // Checkout Product
  cheCkoutProduct = e => {
    e.preventDefault();
    const data = {
      carts: this.state.carts,
      user: this.state.user,
      total: this.state.cartTotal
    };
    fetch("http://localhost:5000/buy-products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        if (res) {
          localStorage.setItem("token", res);
          setInterval((window.location = "/orders"), 2000);
        }
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
          handleNewReview: this.handleNewReview,
          addProductToShopCart: this.addProductToShopCart,
          removeProduct: this.removeProduct,
          removeProductFromCart: this.removeProductFromCart,
          updateCart: this.updateCart,
          cheCkoutProduct: this.cheCkoutProduct
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;
