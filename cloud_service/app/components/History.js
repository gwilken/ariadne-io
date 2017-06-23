import React from "react";

import Select from './Select';
import HistoryGraph from './HistoryGraph'
//import Slider, { Range } from 'rc-slider';
// We can just import Slider or Range to reduce bundle size
import Slider from 'rc-slider/lib/Slider';
// import Range from 'rc-slider/lib/Range';


class History extends React.Component {

  constructor(props) {
    super(props);

//this.state.data.options.scales.xAxes.slice()

    this.state = {
      docs: [],
      data: {
        labels: [],
        datasets: [],
        options: {
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
            easing: 'linear'
          },
          maintainAspectRatio: false,
          scales: {
            yAxes: [],
            xAxes: [],
          }
        },
      },
      chartData: [],
      chartLabels: [],
      chartColors: [],
      time: 180
    }

    this.setTime = this.setTime.bind(this);
    this.addDataset = this.addDataset.bind(this);
  }

  setTime(newTime) {
    this.setState({time: newTime})
  }

  addDataset(data, labels, color) {

    var set = {
      fill: false,
      backgroundColor: color,
      borderWidth: 2,
      lineTension: 0.1,
      pointRadius: 1,
      data: data
    };

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
        easing: 'linear'
      },
      maintainAspectRatio: false,
      scales: {
        yAxes: [],
        xAxes: [],
      }
    }

    var xAxis = {
      ticks: {
        min: 0,
        max: 1000,
      },
      gridLines: {
        display: false,
        drawTicks: false,
      },
      scaleLabel: {
        display: false,
      },
      ticks: {
        display: false,
      }
    };

    var yAxis = {
      position: 'right',
      ticks: {
        mirror: false,
       }
    };

    var newOptions = this.state.data.options;

    newOptions.scales.yAxes.push(yAxis);
    newOptions.scales.xAxes.push(xAxis);

    var newLabels = this.state.data.labels.slice();
    newLabels.push(labels);

    var newDatasets = this.state.data.datasets.slice();
    newDatasets.push(set);

    var newObj = {
      labels: newLabels,
      datasets: newDatasets,
      options: newOptions
    }

    this.setState( { data: newObj } );
  }


  addData(name, field) {

    fetch('/data/' + this.state.time)
      .then((res) => res.json())
        .then(function(docs) {

          var data = docs.map(function(obj) {
            return obj.telemetry[name][field];
          })

          this.addDataset(data, [], 'blue');

        }.bind(this));
  }

  componentDidMount() {

    var name = this.props.selected.name;
    var field = this.props.selected.field;

    console.log(name, field);

    fetch('/data/' + this.state.time)
      .then((res) => res.json())
        .then(function(docs) {

          console.log(docs);

            var data = docs.map( function(obj) {
              return obj.telemetry[name][field];
            })

            this.addDataset(data, [], 'yellow');

        }.bind(this));
  }

  render() {

    return (

      <div> <h3>Historical ***TESTING****</h3>

        <div className="historyContainer">

          <div className="historySelect">
            <div onClick={ () => this.addData('Solar Controller Monitor', 'current') }>***select***</div>
          </div>


          <HistoryGraph datasets={this.state.data} />


          <div className="sliderContainer">
             <Slider min={0} max={200} defaultValue={3}  />
          </div>

        </div>

      </div>
    )
  }

}
export default History;
