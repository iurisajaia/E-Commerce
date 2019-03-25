import React, { Component } from "react";
import { Link } from "react-router-dom";
class AsideCategories extends Component {
  state = {};
  render() {
    var categories = this.props.categories;
    return (
      <div className="col-md-3 product-price">
        <div className=" rsidebar span_1_of_left">
          <ul className="menu">
            <li className="item1">
              <h6>Categories</h6>
              <ul className="cute">
                {categories
                  ? categories.map(category => {
                      return (
                        <li className="subitem1" key={category._id}>
                          <Link to={`cat/${category._id}`} value={category._id}>
                            {category.name}
                          </Link>
                        </li>
                      );
                    })
                  : null}
              </ul>
            </li>
          </ul>
        </div>
      </div>

      // <div className="col-lg-3">
      //   <h1 className="my-4">Categories</h1>
      //   <div className="list-group">
      //     {categories
      //       ? categories.map(category => {
      //           return (
      //             <button
      //               to={`cat/${category._id}`}
      //               key={category._id}
      //               className="list-group-item"
      //               value={category._id}
      //             >
      //               {category.name}
      //             </button>
      //           );
      //         })
      //       : null}
      //   </div>
      // </div>
    );
  }
}

export default AsideCategories;
