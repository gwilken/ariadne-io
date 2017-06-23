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

    this.state = {
      docs: [],
      data: {
        labels: [],
        datasets: [],
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
      fill: true,
      backgroundColor: color,
      borderWidth: 2,
      lineTension: 0.1,
      pointRadius: 0,
      data: data
    };

    var newLabels = this.state.data.labels.slice();
    newLabels.push(labels);

    var newDatasets = this.state.data.datasets.slice();
    newDatasets.push(set);

    var newObj = {
      labels: newLabels,
      datasets: newDatasets
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

          var labels = this.state.data.labels;
          labels.push(data);

          var datasets = this.state.data.datasets;

          // var dataset = {
          //   fill: true,
          //   backgroundColor: 'royalblue',
          //   borderWidth: 2,
          //   lineTension: 0.1,
          //   pointRadius: 0,
          //   data: []
          // };

  //this.setState( { motor: Object.assign( {}, this.state.motor, {ey: msg} ) } );

          dataset.data = data.slice();

          datasets.push(dataset);

          var newObj = {
            labels: labels,
            datasets: datasets
          }

          this.setState( { data: newObj } );

        }.bind(this));
  }

  componentDidMount() {

    var dataset = {
      fill: true,
      backgroundColor: 'royalblue',
      borderWidth: 2,
      lineTension: 0.1,
      pointRadius: 0,
      data: []
    };

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

            this.addDataset(data, data, 'yellow');

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
