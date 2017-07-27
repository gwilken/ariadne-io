import React from "react";
import History from "./History";
import {HorizontalBar} from 'react-chartjs-2';

var voltsHistory = null;
var currentHistory = null;

class House extends React.Component {

  constructor(props) {
    super(props);

    this.voltsClick = this.voltsClick.bind(this);
    this.currentClick = this.currentClick.bind(this);
  }

  voltsClick(event) {
    var obj = {
      family: this.props.data[0].family,
      displayName: this.props.data[0].data[0].displayName,
      unit: this.props.data[0].data[0].unit,
      color: this.props.color
    }

    voltsHistory = ( <History view={obj} handleClick={ () => voltsHistory = null } /> )

  }

  currentClick(event) {
    var obj = {
      family: this.props.data[0].family,
      displayName: this.props.data[0].data[1].displayName,
      unit: this.props.data[0].data[1].unit,
      color: this.props.color
    };

    currentHistory = ( <History view={obj} handleClick={ () => currentHistory = null } /> )

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
              backgroundColor: [this.props.color]
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
              backgroundColor: [this.props.color]
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
            max: 10000,
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

        <h2>House</h2>

        <div className="family-container">

          <div className="graphContainer">
            <HorizontalBar data={voltsGraphData}
                options={voltsGraphOptions}
                width={800}
                height={140}
            />

            <div className="titlebar">

              <div className="title">Battery Voltage</div>
              <div className="rtData"> {volts} V</div>

            </div>

          </div>

          {voltsHistory}

          <div className="graphContainer">
            <HorizontalBar data={currentGraphData}
                options={currentGraphOptions}
                width={800}
                height={140}
            />

            <div className="titlebar">
              <div className="title">Current Usage</div>
              <div className="rtData"> {current} mA</div>
            </div>
          </div>

          {currentHistory}

        </div>

      </div>
    )
  }
}
export default House;
