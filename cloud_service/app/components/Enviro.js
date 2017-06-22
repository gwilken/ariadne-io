import React from "react";
import {HorizontalBar} from 'react-chartjs-2';

class Enviro extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: []
    }
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {

    var rtPress = this.props.data.pressure.toFixed(2) + ' mB';

    // T(°C) × 9/5 + 32

    var tempF = this.props.data.temperature * 9/5 + 32;
    var tempDisplay = tempF.toFixed(2) + '\u00B0' + ' F' ;

    var tempData = {
        labels: [tempF],
        datasets: [
            {
              labels: '',
              data: [tempF],
              backgroundColor: ['lightseagreen']
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
      labels: [this.props.data.pressure],
      datasets: [
          {
            labels: '',
            data: [this.props.data.pressure],
            backgroundColor: ['lightseagreen']
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
              <div className="rtData"> {rtPress}</div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}
export default Enviro;
