import React, { Component } from "react";
import { MyContext } from "../../State";
// import { Link } from "react-router-dom";
// import Slider from "./slider";
// import Product from "../products/product";
// import Baner from "../header/baner";
import LatestProducts from "./latest-products";

class Home extends Component {
  static contextType = MyContext;

  state = {
    search: "",
    category: ""
  };

  componentDidMount() {
    this.setState({
      cart: this.context.state.carts,
      user: this.context.state.user
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
      console.log(filteredProds);
    }
    return (
      <MyContext.Consumer>
        {context => (
          <>
            {/* <Baner /> */}
            <LatestProducts />

            <div className="container">
              {/* LeftSide */}
              <div className="col-md-3 col-sm-12" />
              {/* LeftSide */}

              {/* Products */}
              <div className="col-md-8 col-md-12">
                {/* Products */}
                <div className="row">
                  {/* {context.state.products
                    ? context.state.products.map(product => {
                        return (
                          <Product
                            key={product._id}
                            product={product}
                            // companies={context.state.companies}
                          />
                        );
                      })
                    : null} */}
                </div>
                {/* Products */}
              </div>
              {/* Products */}
            </div>
          </>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Home;
