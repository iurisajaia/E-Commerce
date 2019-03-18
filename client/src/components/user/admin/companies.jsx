import React, { Component } from "react";
// import axios from "axios";
class Categories extends Component {
  state = {};

  addCompany = event => {
    event.preventDefault();
    const data = {
      name: event.target.company.value
    };

    fetch("http://localhost:5000/add-company", {
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

  render() {
    var companies = this.props.companies;
    return (
      <div id="menu3" className="tab-pane fade">
        <form className="form-group container m-2" onSubmit={this.addCompany}>
          <input
            type="text"
            placeholder="enter new company"
            id="company"
            className="form-control"
          />
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
        {companies && (
          <>
            <h5>Categories</h5>
            <ul className="list-group">
              {companies.map(cat => {
                return (
                  <li key={cat._id} className="list-group-item">
                    {cat.name}
                  </li>
                );
              })}
            </ul>
          </>
        )}
        {!companies && <></>}
      </div>
    );
  }
}

export default Categories;
