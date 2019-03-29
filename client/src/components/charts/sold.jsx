import React, { Component } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";

class AllStats extends Component {
  constructor(props) {
    super(props);
    var products = this.props.state.products;
    var titles = [];
    var sold = [];

    for (let i = 0; i < products.length; i++) {
      if (products[i].sold > 0) {
        titles.push(products[i].title);
        sold.push(products[i].sold);
      }
    }

    this.state = {
      chartData: {
        labels: [...titles],
        datasets: [
          {
            label: "Products",
            data: [...sold],
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
          <h3 className="section-title">Product Sold</h3>
        </div>
        <Bar
          data={this.state.chartData}
          fontSize={25}
          height={100}
          options={{}}
        />
      </div>
    );
  }
}

export default AllStats;
