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
      chartData: [],
      chartColor: "gold",
      time: 180
    }

    this.setTime = this.setTime.bind(this);
  }

  setTime(newTime) {
    this.setState({time: newTime})
  }

  componentDidMount() {

    var name = this.props.selected.name;
    var field = this.props.selected.field;
    var color = this.props.color;

    fetch('/data/' + this.state.time)
      .then((res) => res.json())
        .then(function(docs) {

            var data = docs.map( function(obj) {
              return obj.telemetry[name][field];
            })

            return data;

        }).then(function(data) {

          this.setState({
            chartData: data,
            chartColor: color
          });

        }.bind(this));
  }

  render() {

    return (

      <div> <h3>Historical ***TESTING****</h3>

        <div className="historyContainer">

          <HistoryGraph data={this.state.chartData} color={this.state.chartColor} />

          <div className="sliderContainer">
             <Slider min={0} max={200} defaultValue={3}  />
          </div>

        </div>

      </div>
    )
  }

}
export default History;
