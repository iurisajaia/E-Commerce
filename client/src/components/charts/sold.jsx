import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

class AllStats extends Component {
  constructor(props) {
    super(props);
    var products = this.props.state.products;
    var titles = [];
    var sold = [];
    var price = [];

    for (let i = 0; i < products.length; i++) {
      if (products[i].sold > 0) {
        titles.push(products[i].title);
        sold.push(products[i].sold);
        price.push(products[i].price * products[i].sold);
        var sum = price.reduce(add);

        function add(accumulator, a) {
          return accumulator + a;
        }
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
      },
      sum
    };
  }
  render() {
    return (
      <div className="gender-chart">
        <div className="text-center mt-3 mb-3">
          <h3 className="section-title">Product Sold</h3>
        </div>
        <Pie
          data={this.state.chartData}
          fontSize={25}
          height={100}
          options={{}}
        />
        {this.state.sum ? (
          <div className="text-center mt-2 mb-2">
            <h3>Total Received Money : {this.state.sum}$</h3>
          </div>
        ) : null}
      </div>
    );
  }
}

export default AllStats;
