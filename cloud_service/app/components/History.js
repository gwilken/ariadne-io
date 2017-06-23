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
        datasets: [
            {
              fill: true,
              backgroundColor: 'royalblue',
              borderWidth: 2,
              lineTension: 0.1,
              pointRadius: 0,
              data: null
            }
         ]
      },
      chartData: [],
      chartLabels: [],
      chartColors: [],
      time: 180
    }

    this.setTime = this.setTime.bind(this);
  }

  setTime(newTime) {
    this.setState({time: newTime})
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

          var dataset = {
            fill: true,
            backgroundColor: 'royalblue',
            borderWidth: 2,
            lineTension: 0.1,
            pointRadius: 0,
          };

          dataset.data = data;

          datasets.push(dataset);

          var newObj = {
            labels: labels,
            datasets: datasets
          }

          this.setState( { data: newObj } );

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

          this.setState( { docs: docs} );

            var data = docs.map( function(obj) {
              return obj.telemetry[name][field];
            })

            console.log('data', data);

            var dataset = {
              fill: true,
              backgroundColor: 'royalblue',
              borderWidth: 2,
              lineTension: 0.1,
              pointRadius: 0,
              data: data
            };

            console.log('dataset', dataset);

            var labels = this.state.data.labels;
            labels.push(data);

            var datasets = this.state.data.datasets;

            datasets.push(dataset);

            var newObj = {
              labels: labels,
              datasets: datasets
            }

            this.setState( { data: newObj } );

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
