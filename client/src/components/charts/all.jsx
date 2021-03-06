import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class AllStats extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.state.categories);
    this.state = {
      chartData: {
        labels: ["Categories", "Products", "Users", "Companies"],
        datasets: [
          {
            label: "Statistics",
            data: [
              this.props.state.categories.length,
              this.props.state.products.length,
              this.props.state.admin.length,
              this.props.state.companies.length
            ],
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
          <h3 className="section-title">Shop Statistic</h3>
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
