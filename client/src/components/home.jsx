import React, { Component } from "react";
import { MyContext } from "../State";
import { Link } from "react-router-dom";
class Home extends Component {
  static contextType = MyContext;
  state = {};
  async componentDidMount() {
    await this.setState({ user: this.context.state.user });
  }
  render() {
    console.log(this.state);
    return (
      <MyContext.Consumer>
        {context => (
          <>
            <div className="jumbotron">
              <h1 className="display-4">
                {context.state.user ? (
                  <>Hello, {context.state.user.firstname}!</>
                ) : null}
              </h1>
              <p className="lead">
                This is a simple hero unit, a simple jumbotron-style component
                for calling extra attention to featured content or information.
              </p>
              <hr className="my-4" />
              <p>
                It uses utility classNamees for typography and spacing to space
                content out within the larger container.
              </p>
              <Link
                to="/registration"
                className="btn btn-primary btn-lg"
                role="button"
              >
                Registration
              </Link>
              <Link
                to="/login"
                className="btn btn-primary btn-lg ml-4"
                role="button"
              >
                Login
              </Link>
            </div>
          </>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Home;
