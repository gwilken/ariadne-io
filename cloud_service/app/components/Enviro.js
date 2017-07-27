import React from "react";
import RealtimeBar from "./RealtimeBar";

import {HorizontalBar} from 'react-chartjs-2';

class Enviro extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      color: 'darkviolet'
    }

    this.windClick = this.windClick.bind(this);
    this.pressureClick = this.pressureClick.bind(this);
    this.humidityClick = this.humidityClick.bind(this);
    this.tempClick = this.tempClick.bind(this);
  }

  windClick(event) {
    this.props.handleClick({
      family: this.props.data[0].family,
      displayName: this.props.data[0].data[3].displayName,
      unit: this.props.data[0].data[3].unit,
      color: this.state.color
    });
  }

  tempClick(event) {
    this.props.handleClick({
      family: this.props.data[0].family,
      displayName: this.props.data[0].data[0].displayName,
      unit: this.props.data[0].data[0].unit,
      color: this.state.color
    });
  }

  pressureClick(event) {
    this.props.handleClick({
      family: this.props.data[0].family,
      displayName: this.props.data[0].data[2].displayName,
      unit: this.props.data[0].data[2].unit,
      color: this.state.color
    });
  }

  humidityClick(event) {
    this.props.handleClick({
      family: this.props.data[0].family,
      displayName: this.props.data[0].data[1].displayName,
      unit: this.props.data[0].data[1].unit,
      color: this.state.color
    });
  }

  render() {

    var temp = this.props.data[0].data[0].data.toFixed(2);
    var humidity = this.props.data[0].data[1].data.toFixed(2);
    var pressure = this.props.data[0].data[2].data.toFixed(2);
    var windSpeed = this.props.data[0].data[3].data.toFixed(2);

    var tempF = temp * 9/5 + 32;
    var tempDisplay = tempF.toFixed(2) + '\u00B0' + ' F' ;

    if(windSpeed < 0) windSpeed = 0;

    var windKnots = (windSpeed * 1.943844).toFixed(2);

    var windData = {
        labels: [windKnots],
        datasets: [
            {
              labels: '',
              data: [windKnots],
              backgroundColor: [this.state.color]
            }
         ]
       };

    var windOptions = {
      onClick: this.windClick,
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
            max: 65,
          },
          gridLines: {
            display: false,
            drawTicks: true,
          },
        }]
      }
    }

    var tempData = {
        labels: [tempF],
        datasets: [
            {
              labels: '',
              data: [tempF],
              backgroundColor: [this.state.color]
            }
         ]
       };

    var tempOptions = {
    onClick: this.tempClick,
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
          max: 120,
        },
        gridLines: {
          display: false,
          drawTicks: true,
        },
      }]
    }
  }

  var humidityData = {
      labels: [humidity],
      datasets: [
          {
            labels: '',
            data: [humidity],
            backgroundColor: [this.state.color]
          }
       ]
     };

  var humidityOptions = {
    onClick: this.humidityClick,
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
        max: 100,
      },
      gridLines: {
        display: false,
        drawTicks: true,
      },
    }]
  }
  }

  var pressData = {
      labels: [pressure],
      datasets: [
          {
            labels: '',
            data: [pressure],
            backgroundColor: ['darkviolet']
          }
       ]
     };

  var pressOptions = {
    onClick: this.pressureClick,
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
        min: 300,
        max: 1100,
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

      <h2>Environmental</h2>

      <div>

        <RealtimeBar
          data={windKnots}
          title="Wind Speed"
          realtimedata={windKnots + ' Knots'}
          color={this.props.color}
          handleClick={null}
          range={{low: 0, high: 65}}
        />

        <RealtimeBar
          data={temp}
          title="Temperature"
          realtimedata={temp + ' C'}
          color={this.props.color}
          handleClick={null}
          range={{low: 0, high: 50}}
        />

        <RealtimeBar
          data={humidity}
          title="Humidity"
          realtimedata={humidity + '%'}
          color={this.props.color}
          handleClick={null}
          range={{low: 0, high: 100}}
        />

        <RealtimeBar
          data={pressure}
          title="Humidity"
          realtimedata={pressure + ' mB'}
          color={this.props.color}
          handleClick={null}
          range={{low: 300, high: 1100}}
        />

      </div>
    </div>
  )
  }
}
export default Enviro;
