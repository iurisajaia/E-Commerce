import React, { Component } from "react";
import axios from "axios";
class Categories extends Component {
  state = {};

  addCategory = event => {
    event.preventDefault();
    const data = {
      name: event.target.category.value
    };

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
        console.log(res);
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentDidMount() {
    fetch("http://localhost:5000/admin/categories", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(categories => {
        // console.log(categories);
        if (categories) {
          this.setState({ categories });
        } else {
          console.log("no categories");
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    var categories;
    if (this.state.categories) {
      categories = this.state.categories.categories;
      // console.log(categories[0]);
    }
    return (
      <div id="menu2" className="tab-pane fade">
        <form className="form-group container m-2" onSubmit={this.addCategory}>
          <input
            type="text"
            placeholder="enter new category"
            id="category"
            className="form-control"
          />
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
        {categories && (
          <>
            <h5>Categories</h5>
            <ul className="list-group">
              {categories.map(cat => {
                return (
                  <li key={cat._id} className="list-group-item">
                    {cat.name}
                  </li>
                );
              })}
            </ul>
          </>
        )}
        {!categories && <></>}
      </div>
    );
  }
}

export default Categories;
