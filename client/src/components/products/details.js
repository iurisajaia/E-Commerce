import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import { MyContext } from "../../State";
import AsideCategories from "./asidecategories";
import ProductPart from "./single/product-part";
import Reviews from "./single/reviews";
// import AnotherProducts from "./single/anotherproducts";
import EditProducts from "./single/editproducts";
export default class details extends Component {
  static contextType = MyContext;
  state = {};

  //  Add New Company To Product
  addCompanyToProduct = event => {
    event.preventDefault();

    const data = {
      company: event.target.company.value,
      price: event.target.price.value,
      product: event.target.product.value
    };

    fetch("http://localhost:5000/add-new-company", {
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

  // Add product in cart
  addToCartHandler = async () => {
    const productID = this.props.computedMatch.params.id;
    // const token = localStorage.getItem("token");
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    } else {
      // cart = []
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    const res = await axios.get("http://localhost:5000/all-product");
    const product = res.data.filter(el => {
      return el._id.match(productID);
    });
    cart.push(product[0]);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  // Update Input Values
  changeTitle = e => {
    this.setState({
      title: e.target.value
    });
  };
  changeDescription = e => {
    this.setState({
      description: e.target.value
    });
  };
  changePrice = e => {
    this.setState({
      price: e.target.value
    });
  };

  updateProduct = async e => {
    e.preventDefault();

    const data = {
      id: e.target.prodid.value,
      title: e.target.title.value,
      description: e.target.description.value,
      price: e.target.price.value
    };
    fetch("http://localhost:5000/update-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        // console.log(res);
      })
      .catch(error => {
        console.error(error);
      });
  };

  async componentDidMount() {
    const products = await axios.get("http://localhost:5000/all-product");
    const targetProduct = products.data.filter(product => {
      return product._id.match(this.props.computedMatch.params.id);
    });

    this.setState({
      title: targetProduct[0].title,
      description: targetProduct[0].description,
      categories: targetProduct[0].categories,
      company: targetProduct[0].company,
      imageUrl: targetProduct[0].imageUrl,
      price: targetProduct[0].price,
      reviews: targetProduct[0].reviews,
      id: targetProduct[0]._id
    });
    // console.log(this.state);
  }

  render() {
    let product = this.state;
    return (
      <MyContext.Consumer>
        {context => (
          <>
            <div className="product">
              <div className="container row">
                <AsideCategories categories={this.context.state.categories} />

                <div className="col-md-9 product-price1">
                  <ProductPart product={product} />
                  <Reviews product={product} />
                  {/* <AnotherProducts /> */}
                  <EditProducts
                    product={product}
                    updateProduct={this.updateProduct}
                    changePrice={this.changePrice}
                    changeDescription={this.changeDescription}
                    changeTitle={this.changeTitle}
                  />
                </div>
                <div className="clearfix"> </div>
              </div>
            </div>
          </>
        )}
      </MyContext.Consumer>
    );
  }
}
