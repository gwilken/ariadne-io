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
      data: [],
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
        .then(function(objs) {

          var data = objs.map(function(obj) {
            return obj.telemetry[name][field];
          })

          var dataArr = [];

          dataArr.push(this.state.data);
          dataArr.push(data);


          this.setState( { chartData: dataArr, chartLabels: dataArr } );

        }.bind(this));
  }

  componentDidMount() {

    var name = this.props.selected.name;
    var field = this.props.selected.field;

    fetch('/data/' + this.state.time)
      .then((res) => res.json())
        .then(function(objs) {
          console.log(objs);

          this.setState( { data: objs} );

            var data = objs.map( function(obj) {
              return obj.telemetry[name][field];
            })

            this.setState({chartData: data, chartLabels: data })



        }.bind(this));
  }

  render() {

    return (

      <div> <h3>Historical ***TESTING****</h3>

        <div className="historyContainer">

          <div className="historySelect">
            <div onClick={ () => this.addData('Solar Controller Monitor', 'current') }>***select***</div>
          </div>


          <HistoryGraph chartLabels={this.state.chartLabels} chartData={this.state.chartData} chartColors={this.state.chartColors} />


          <div className="sliderContainer">
             <Slider min={0} max={200} defaultValue={3}  />
          </div>

        </div>

      </div>
    )
  }

}
export default History;
