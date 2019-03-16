import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Product from "./product";
class Home extends Component {
  state = {
    posts: []
  };
  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/posts").then(res => {
      // console.log(res);
      this.setState({
        posts: res.data.slice(0, 20)
      });
    });
  }
  state = {};
  render() {
    return (
      // <h1>test</h1>
      <>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <h1 className="my-4">Shop Name</h1>
              <div className="list-group">
                <Link to="#" className="list-group-item">
                  Category 1
                </Link>
                <Link to="#" className="list-group-item">
                  Category 2
                </Link>
                <Link to="#" className="list-group-item">
                  Category 3
                </Link>
              </div>
            </div>

            <div className="col-lg-9">
              <div
                id="carouselExampleIndicators"
                className="carousel slide my-4"
                data-ride="carousel"
              >
                <ol className="carousel-indicators">
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="0"
                    className="active"
                  />
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="1"
                  />
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="2"
                  />
                </ol>
                <div className="carousel-inner" role="listbox">
                  <div className="carousel-item active">
                    <img
                      className="d-block img-fluid"
                      src="http://placehold.it/900x350"
                      alt="First slide"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-block img-fluid"
                      src="http://placehold.it/900x350"
                      alt="Second slide"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-block img-fluid"
                      src="http://placehold.it/900x350"
                      alt="Third slide"
                    />
                  </div>
                </div>
                <Link
                  className="carousel-control-prev"
                  to="#carouselExampleIndicators"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Previous</span>
                </Link>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Next</span>
                </a>
              </div>

              <div className="row">
                {this.state.posts
                  ? this.state.posts.map(post => {
                      return <Product key={post.id} post={post} />;
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
