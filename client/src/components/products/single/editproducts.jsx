import React, { Component } from "react";
import { MyContext } from "../../../State";
class EditProducts extends Component {
  state = {};

  render() {
    const product = this.props.product;
    const updateProduct = this.props.updateProduct;
    const changePrice = this.props.changePrice;
    const changeDescription = this.props.changeDescription;
    const changeTitle = this.props.changeTitle;
    return (
      <MyContext.Consumer>
        {context => (
          <>
            {product.id ? (
              <div className="container">
                {context.state.admin && (
                  <>
                    <hr />
                    <form
                      className="col-md-6 form-group"
                      onSubmit={updateProduct}
                    >
                      <input
                        className="form-control"
                        value={product.title}
                        id="title"
                        onChange={changeTitle.bind(this)}
                      />
                      <input
                        className="form-control"
                        id="description"
                        onChange={changeDescription.bind(this)}
                        value={product.description}
                      />
                      <input
                        className="form-control"
                        id="price"
                        onChange={changePrice.bind(this)}
                        value={product.price}
                      />
                      <input type="hidden" value={product.id} id="prodid" />
                      <button className="btn btn-success m-2 db-block">
                        Update
                      </button>
                    </form>
                  </>
                )}
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </>
        )}
      </MyContext.Consumer>
    );
  }
}

export default EditProducts;
