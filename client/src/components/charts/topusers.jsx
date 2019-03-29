import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

class TopUsers extends Component {
  constructor(props) {
    super(props);
    var users = this.props.state.admin;
    var filtered = users.filter(u => {
      return u.products.length > 0;
    });
    var usernames = [];
    var products = [];

    if (filtered) {
      for (let i = 0; i < filtered.length; i++) {
        usernames.push(filtered[i].username);
        products.push(filtered[i].products.length);
      }
    }

    this.state = {
      chartData: {
        labels: [...usernames],
        datasets: [
          {
            label: "Top Users",
            data: [...products],
            backgroundColor: ["#52489C", "#4062BB", "#F45B69", "#274945"]
          }
        ]
      }
    };
    // console.log(this.props);
  }
  render() {
    return (
      <div className="gender-chart">
        <div className="text-center mt-3 mb-3">
          <h3 className="section-title">Top Users</h3>
        </div>
        <Pie
          data={this.state.chartData}
          fontSize={25}
          height={100}
          options={{}}
        />
      </div>
    );
  }
}

export default TopUsers;
