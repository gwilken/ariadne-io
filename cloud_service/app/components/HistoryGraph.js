import React from "react";
import {Line} from 'react-chartjs-2';

class HistoryGraph extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var data = {
      labels: this.props.chartLabels,
      datasets: [
          {
            fill: true,
            backgroundColor: 'royalblue',
            borderWidth: 2,
            lineTension: 0.1,
            pointRadius: 0,
            data: this.props.chartData
          }
       ]
    }

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
            min: this.props.min,
            max: this.props.max,
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
        <Line data={data}
            options={options}
            width={800}
            height={800}
        />
      </div>
    )
  }
}

export default HistoryGraph;
