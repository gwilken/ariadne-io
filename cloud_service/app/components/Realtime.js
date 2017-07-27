import React from "react";
import {HorizontalBar} from 'react-chartjs-2';


class Realtime extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const data = {
        labels: [this.props.data],
        datasets: [
            {
              labels: '',
              data: [this.props.data],
              backgroundColor: [this.props.color]
            }
         ]
       };

    const options = {
      onClick: this.props.handleClick,
      layout: {
        padding: {
          left: 15,
        },
      },
      tooltips: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
            max: 0,
            display: false,
          },
          barThickness: 140,
          display: false,
        }],
        xAxes: [{
          ticks: {
            min: this.props.range.low,
            max: this.props.range.high,
          },
          gridLines: {
            display: false,
            drawTicks: true,
          },
        }]
      }
    }


    return(

      <div className="graphContainer">

        <HorizontalBar data={data}
            options={options}
            width={800}
            height={140}
        />

        <div className="titlebar">
          <div className="title">{this.props.title}</div>
          <div className="rtData">{this.props.realtimedata}</div>
        </div>

      </div>

    )
  }

}

export default Realtime;
