import React, { Component } from "react";
import { MyContext } from "../../../State";
class Categories extends Component {
  state = {};

  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <>
            <div id="menu3" className="tab-pane fade">
              <form
                className="form-group container m-2"
                onSubmit={context.addCompany}
              >
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
              {context.state.companies && (
                <>
                  <h5>Categories</h5>
                  <ul className="list-group">
                    {context.state.companies.map(cat => {
                      return (
                        <li key={cat._id} className="list-group-item">
                          {cat.name}
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
              {!context.state.companies && <></>}
            </div>
          </>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Categories;
