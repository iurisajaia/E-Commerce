import React, { Component } from "react";
import { MyContext } from "../State";
export default class Compare extends Component {
  static contextType = MyContext;
  state = {
    details: []
  };
  componentDidMount() {
    let details = [];
    if (localStorage.getItem("details")) {
      details = JSON.parse(localStorage.getItem("details"));
      this.setState({ details });
    }
  }
  removeItem = id => {
    const items = this.state.details.filter((el, i) => {
      return el._id !== id;
    });
    localStorage.setItem("details", JSON.stringify(items));
    this.setState({ details: items });
  };
  render() {
    const result = this.state.details.length ? (
      this.state.details.map((el, i) => {
        return (
          <>
            <div className="col-md-6 col-ms-12" key={this.state.details[i]._id}>
              <div className="row">
                <div className="col-md-12 col-sm-12 single-top-in simpleCart_shelfItem">
                  <div className="product-info">
                    <img
                      className="single-product__img"
                      src={`/${this.state.details[i].imageUrl}`}
                      alt={this.state.details[i].title}
                    />
                    <h4 className="product-title">
                      {" "}
                      <i className="fas fa-tshirt" />{" "}
                      {this.state.details[i].title}
                    </h4>
                    <hr className="custom-line" />

                    <h5 className="product-price">
                      <i className="fas fa-dollar-sign" />{" "}
                      {this.state.details[i].price}
                    </h5>

                    <hr className="custom-line" />

                    <h4 className="product-description">
                      <i className="fas fa-quote-left" />
                      {this.state.details[i].description}
                      <i className="fas fa-quote-right" />
                    </h4>

                    <hr className="custom-line" />

                    <h4 className="product-seller">
                      <i className="fab fa-creative-commons-by" />
                      {this.state.details[i].company}
                    </h4>
                    <hr className="custom-line" />
                    <button
                      className="btn btn-danger"
                      onClick={() => this.removeItem(this.state.details[i]._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="clearfix"> </div>
              </div>
            </div>
          </>
        );
      })
    ) : (
      <h2>Empey List</h2>
    );
    console.log(this.state);
    return (
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">Compare Products</h2>
        </div>
        <div className="row">{result}</div>
      </div>
    );
  }
}
