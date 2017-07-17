import React from "react";
import {HorizontalBar} from 'react-chartjs-2';

class Enviro extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      color: 'darkviolet'
    }
  }

  render() {

    var temp = this.props.data[0].data[0].data.toFixed(2);
    var humidity = this.props.data[0].data[1].data.toFixed(2);
    var pressure = this.props.data[0].data[2].data.toFixed(2);
    var windSpeed = this.props.data[0].data[3].data.toFixed(2);

    var tempF = temp[0].data * 9/5 + 32;
    var tempDisplay = tempF.toFixed(2) + '\u00B0' + ' F' ;

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

  var pressData = {
      labels: [pressure[0].data],
      datasets: [
          {
            labels: '',
            data: [pressure[0].data],
            backgroundColor: ['darkviolet']
          }
       ]
     };

  var pressOptions = {
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

      <div> <h3>Environmental</h3>
        <div>

          <div className="graphContainer">
            <HorizontalBar data={tempData}
                options={tempOptions}
                width={800}
                height={140}
            />

            <div className="titlebar">

              <div className="title">Temperature</div>
              <div className="rtData"> {tempDisplay} </div>

            </div>
          </div>

          <div className="graphContainer">
            <HorizontalBar data={pressData}
                options={pressOptions}
                width={800}
                height={140}
            />

            <div className="titlebar">
              <div className="title">Barometric Pressure</div>
              <div className="rtData"> {pressure[0].data} mB</div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}
export default Enviro;
