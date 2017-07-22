import React from "react";
import {HorizontalBar} from 'react-chartjs-2';

class Solar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      color: 'gold'
    }

    this.voltsClick = this.voltsClick.bind(this);
    this.currentClick = this.currentClick.bind(this);
  }

  voltsClick(event) {
    this.props.handleClick({
      family: this.props.data[0].family,
      displayName: this.props.data[0].data[0].displayName,
      unit: this.props.data[0].data[0].unit,
      color: this.state.color
     });
  }

  currentClick(event) {
    this.props.handleClick({
      family: this.props.data[0].family,
      displayName: this.props.data[0].data[1].displayName,
      unit: this.props.data[0].data[1].unit,
      color: this.state.color
    });
  }

  render() {

    var volts = this.props.data[0].data[0].data.toFixed(2);
    var current = this.props.data[0].data[1].data.toFixed(0);

    const voltsGraphData = {
        labels: [volts],
        datasets: [
            {
              labels: '',
              data: [volts],
              backgroundColor: [this.state.color]
            }
         ]
       };

    const voltsGraphOptions = {
      onClick: this.voltsClick,
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
            min: 10,
            max: 14.5,
          },
          gridLines: {
            display: false,
            drawTicks: true,
          },
        }]
      }
    }

    const currentGraphData = {
        labels: [current],
        datasets: [
            {
              labels: '',
              data: [current],
              backgroundColor: [this.state.color]
            }
         ]
       };

    const currentGraphOptions = {
      onClick: this.currentClick,
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
            min: 0,
            max: 7500,
          },
          gridLines: {
            display: false,
            drawTicks: true,
          },
        }]
      }
    }

    return (

      <div>

        <h2>{this.props.data[0].displayName}</h2>

        <div>

          <div className="graphContainer">
            <HorizontalBar data={voltsGraphData}
                options={voltsGraphOptions}
                width={800}
                height={140}
            />

            <div className="titlebar">

              <div className="title">Panel Voltage</div>
              <div className="rtData"> {volts} V</div>

            </div>
          </div>

          <div className="graphContainer">
            <HorizontalBar data={currentGraphData}
                options={currentGraphOptions}
                width={800}
                height={140}
            />

            <div className="titlebar">
              <div className="title">Current Output</div>
              <div className="rtData"> {current} mA</div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default Solar;
