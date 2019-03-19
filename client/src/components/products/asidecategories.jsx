import React, { Component } from "react";
// import { Link } from "react-router-dom";
class AsideCategories extends Component {
  state = {};
  render() {
    var categories = this.props.categories;
    return (
      <div className="col-lg-3">
        <h1 className="my-4">Categories</h1>
        <div className="list-group">
          {categories
            ? categories.map(category => {
                return (
                  <button
                    to={`cat/${category._id}`}
                    key={category._id}
                    className="list-group-item"
                    value={category._id}
                  >
                    {category.name}
                  </button>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

export default AsideCategories;
