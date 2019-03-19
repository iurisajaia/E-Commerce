import React, { Component } from "react";
import Products from "./products";
class Category extends Component {
  state = {};
  componentDidMount() {
    this.setState({ category: this.props.computedMatch.params.id });
    // console.log(this.props.computedMatch.params.id);
  }
  render() {
    var products;
    if (this.props.products) {
      products = this.props.products;

      var targetProduct = products.filter(product => {
        return product.categories.match(this.state.category);
      });
    }
    return (
      <>
        <ul className="list-group">
          {targetProduct
            ? targetProduct.map(product => {
                return (
                  <li key={product._id} className="list-group-item">
                    {product.title}
                  </li>
                );
              })
            : null}
        </ul>
      </>
    );
  }
}

export default Category;
