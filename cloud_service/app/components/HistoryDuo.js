import React from "react";
import HistoryGraph from './HistoryGraph'
import {Line} from 'react-chartjs-2';
import Slider from 'rc-slider/lib/Slider';

class HistoryDuo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      docs: [],
      data: {},
      color: '',
      name: '',
      field1: '',
      field2: '',
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
    var field1 = this.props.selected.field1;
    var field2 = this.props.selected.field2;
    var color = this.props.color;

    fetch('/data/' + this.state.time)
      .then((res) => res.json())
        .then(function(docs) {

          //console.log(docs);

            var data1 = docs.map( function(obj) {
                return obj.telemetry[name][field1];
              });

            var data2 = docs.map( function(obj) {
                  return obj.telemetry[name][field2];
              });

          var data = {
            data1: data1,
            data2: data2
          }

            return data;

        }).then(function(data) {

          console.log(data);

          console.log('state:', this.state);

          var newObj = Object.assign( {}, this.state, {data} );

          console.log('newobj:', newObj);

          this.setState({
            data: newObj,
            color: color,
            name: name,
            field1: field1,
            field2: field2
          });

        }.bind(this));
  }

  render() {

    console.log(this.state);

    var graph1 = null;
    var graph2 = null;

    if(this.state.data.data1) {

      var data1 = {
        labels: this.state.data.data1,
        datasets: [
            {
              fill: true,
              backgroundColor: this.state.color,
              borderWidth: 2,
              lineTension: 0.1,
              pointRadius: 0,
              data: this.state.data.data1
            }
         ]
      }

      graph1 = (
        <Line data={data1}
            options={options}
            width={800}
            height={500}
        />
      )
    }

    if(this.state.data.data2) {

      var data2 = {
        labels: this.state.data.data2,
        datasets: [
            {
              fill: true,
              backgroundColor: this.state.color,
              borderWidth: 2,
              lineTension: 0.1,
              pointRadius: 0,
              data: this.state.data.data2
            }
         ]
      }

      graph2 = (
        <Line data={data2}
            options={options}
            width={800}
            height={500}
        />
      )
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

      <div>

        <h3>Historical Data
          <span className='backButton' onClick={ () => this.props.setView('all') }> Back </span>
        </h3>

        <h4>{this.state.name} - {this.state.field1} - {this.state.field2}</h4>

        <div className="historyContainer">

          <div className="historyGraph">

            {graph1}

            {graph2}

            <div className="sliderContainer">
               <Slider min={0} max={200} defaultValue={3}  />
            </div>

          </div>

        </div>

      </div>
    )
  }

}
export default HistoryDuo;
