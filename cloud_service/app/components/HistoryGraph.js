import React from "react";
import {Line} from 'react-chartjs-2';

class HistoryGraph extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var options = {
      layout: {
        padding: {
          left: 15,
          right: 3,
        },
      },
      tooltips: {
        enabled: false,
      },
      legend: {
        display: false,
        position: 'top',
      },
      animation: {
        // duration: 100,
        easing: 'linear'
      },
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          position: 'right',
          ticks: {
            mirror: false,
           },
          }],
        xAxes: [{
          ticks: {
            min: 0,
            max: 0,
          },
          gridLines: {
            display: false,
            drawTicks: false,
          },
          scaleLabel: {
            display: true,
          },
          ticks: {
            display: false,
          },
        },
        ],
      },
    }


  return (
      <div className="historyGraph">

        <Line data={this.props.datasets}
            options={options}
            width={800}
            height={800}
        />

      </div>
    )
  }
}

export default HistoryGraph;
