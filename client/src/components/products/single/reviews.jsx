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

                  <div className="reviews-box">
                    {product.reviews.map(review => {
                      return (
                        <>
                          <div className="row mb-2" key={review._id}>
                            <div className="col-md-1 col-sm-12">
                              <img
                                className="avatar img-circle img-thumbnail"
                                src="/img/co.png"
                                alt=""
                              />
                            </div>
                            <div className="col-md-11 col-sm-12">
                              <h6>
                                <i class="far fa-user" /> {review.userName}
                              </h6>
                              <p>
                                <i class="fas fa-comments" /> {review.review}
                              </p>
                            </div>
                          </div>
                          <hr className="custom-line" />
                        </>
                      );
                    })}
                  </div>

                  <ul className="cd-tabs-content">
                    <li data-content="television" className="selected">
                      <div className="comments-top-top">
                        <h6 className="add-re">ADD REVIEW</h6>
                        {/* Add Review */}
                        <div className="form-group">
                          <form
                            className="form-group"
                            onSubmit={context.handleNewReview}
                          >
                            <input
                              type="text"
                              className="add-new-review-input"
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
                            <button className="add-review-btn">
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
