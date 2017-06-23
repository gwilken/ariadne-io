import React from "react";
import HistoryGraph from './HistoryGraph'
import {Line} from 'react-chartjs-2';
import Slider from 'rc-slider/lib/Slider';

class History extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      docs: [],
      data: [],
      color: null,
      name: '',
      field: '',
      time: 180
    }

    this.setTime = this.setTime.bind(this);
  }

  setTime(newTime) {
    this.setState({time: newTime})
  }

  componentDidMount() {

    console.log(this.props);

    var name = this.props.selected.name;
    var field = this.props.selected.field;
    var color = this.props.color;

    fetch('/data/' + this.state.time)
      .then((res) => res.json())
        .then(function(docs) {

          //console.log(docs);

            var data = docs.map( function(obj) {
              return obj.telemetry[name][field];
            })

            return data;

        }).then(function(data) {

          console.log(data);

          this.setState({
            data: data,
            color: color,
            name: name,
            field: field
          });

        }.bind(this));
  }

  render() {

    //console.log(this.props);

    var data = {
      labels: this.state.data,
      datasets: [
          {
            fill: true,
            backgroundColor: this.state.color,
            borderWidth: 2,
            lineTension: 0.1,
            pointRadius: 0,
            data: this.state.data
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
        duration: 400,
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

      <div> <h3>Historical Data</h3>
      <h4>{this.state.name} - {this.state.field}</h4>

          <div className='backButton'> Back </div>

        <div className="historyContainer">

          <div className="historyGraph">

            <Line data={data}
                options={options}
                width={800}
                height={800}
            />

            <div className="sliderContainer">
               <Slider min={0} max={200} defaultValue={3}  />
            </div>

          </div>

        </div>

      </div>
    )
  }

}
export default History;
