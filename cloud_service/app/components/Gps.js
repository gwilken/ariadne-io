import React from "react";
import {HorizontalBar} from 'react-chartjs-2';

class Gps extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      color: 'lightseagreen'
    }
  }

  render() {

    console.log(this.props);

    var latitude = this.props.data[0].data[0].data[0];
    var longitude = this.props.data[0].data[0].data[1];
    var speed = this.props.data[0].data[1].data;
    var tmg = this.props.data[0].data[2].data;
    var siv = this.props.data[0].data[3].data;

    var speedData = {
        labels: [speed],
        datasets: [
            {
              labels: '',
              data: [speed],
              backgroundColor: ['lightseagreen']
            }
         ]
       };

    var speedOptions = {
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
          max: 10,
        },
        gridLines: {
          display: false,
          drawTicks: true,
        },
      }]
    }
  }

    return (

      <div> <h2>Geospatial</h2>

          <div className="geoContainer">

            <div className="graphContainer geoSpeed">
              <HorizontalBar data={speedData}
                  options={speedOptions}
                  width={400}
                  height={140}
              />

              <div className="titlebar">
                <div className="title">Speed</div>
                <div className="rtData"> {speed} Knots</div>
              </div>
            </div>

            <div className="geoLocation">
              <div className="geoLocLabel">lat: {latitude}</div>
              <div className="geoLocLabel">lon: {longitude}</div>
            </div>

          </div>

      </div>
    )
  }
}
export default Gps;
