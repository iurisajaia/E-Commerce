import React, { Component } from "react";
import { MyContext } from "../../../State";

class Reviews extends Component {
  state = {};
  render() {
    const product = this.props.product;
    return (
      <MyContext.Consumer>
        {context => (
          <>
            <div className="cd-tabs mt-2">
              {product.id ? (
                <>
                  <nav>
                    <ul className="cd-tabs-navigation">
                      <li>
                        <h6 data-content="television" className="selected ">
                          Reviews ({product.reviews.length})
                        </h6>
                      </li>
                    </ul>
                  </nav>

                  <ul className="cd-tabs-content">
                    <li data-content="television" className="selected">
                      <div className="comments-top-top">
                        {product.reviews.map(review => {
                          return (
                            <div key={review._id}>
                              <div className="top-comment-left">
                                <img
                                  className="img-responsive"
                                  src="/img/co.png"
                                  alt=""
                                />
                              </div>
                              <div className="top-comment-right">
                                <h6>{review.userName}</h6>
                                <p>{review.review}</p>
                              </div>
                              <div className="clearfix"> </div>
                            </div>
                          );
                        })}
                        <h6 className="add-re">ADD REVIEW</h6>
                        {/* Add Review */}
                        <div className="form-group">
                          <form
                            className="form-group"
                            onSubmit={context.handleNewReview}
                          >
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Add Review"
                              id="review"
                            />
                            <input
                              type="hidden"
                              id="product"
                              value={product.id}
                            />
                            {context.state.user && (
                              <>
                                <input
                                  type="hidden"
                                  id="user"
                                  value={context.state.user._id}
                                />
                                <input
                                  type="hidden"
                                  id="userName"
                                  value={context.state.user.firstname}
                                />
                              </>
                            )}
                            <button className="btn btn-warning btn-block">
                              Add Review
                            </button>
                          </form>
                        </div>
                        {/* / Add Review */}
                      </div>
                    </li>

                    <div className="clearfix" />
                  </ul>
                </>
              ) : null}
            </div>
          </>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Reviews;
