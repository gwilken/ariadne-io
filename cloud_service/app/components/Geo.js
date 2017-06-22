import React from "react";
import {HorizontalBar} from 'react-chartjs-2';

class Geo extends React.Component {

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

    var rtLat = this.props.data.latitude;
    var rtLon = this.props.data.longitude;
    var rtSpeed = this.props.data.speed + ' knots';
    //var rtTmg = this.props.data.tmg;

    var speedData = {
        labels: [this.props.data.speed],
        datasets: [
            {
              labels: '',
              data: [this.props.data.speed],
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

      <div> <h3>Geospatial</h3>
        <div>

          <div className="graphContainer">
            <HorizontalBar data={speedData}
                options={speedOptions}
                width={400}
                height={140}
            />

            <div className="titlebar">
              <div className="title">Speed</div>
              <div className="rtData"> {rtSpeed} </div>
            </div>
          </div>


          <div className="graphContainer">

              {/* 800 x 140 */}

          </div>

        </div>
      </div>
    )
  }
}
export default Geo;
