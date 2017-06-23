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
      min: 0,
      max: 15,
      time: 180
    }

    this.setTime = this.setTime.bind(this);
  }

  setTime(newTime) {
    this.setState({time: newTime})
  }

  getData(name, field, newMin, newMax) {

    fetch('/data/' + this.state.time)
      .then((res) => res.json())
        .then(function(objs) {

          var data = objs.map(function(obj) {
            return obj.telemetry[name][field];
          })

          console.log(data);

          this.setState( { chartData: data, chartLabels: data , min: newMin, max: newMax } );

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

  componentWillReceiveProps(nextProps) {

    // if(nextProps.selected === 'temp') {
    //
    //   var data = this.state.data.map(function(obj) {
    //     return obj.telemetry.Environmental.temperature * 9/5 + 32;
    //     //console.log(obj.Environmental);
    //   })
    //
    //   this.setState( { chartData: data, chartLabels: data, max: 120 } );
    //
    //   // var labels = this.state.data.map(function(obj) {
    //   //   return obj.Environmental.temperature;
    //   // })
    //   //
    //   // this.setState( { chartData: data} );
    // }
    //
    // if(nextProps.selected === 'solarcurrent') {
    //
    //   var data = this.state.data.map(function(obj) {
    //     return obj.telemetry["Solar Controller Monitor"].current;
    //     //console.log(obj.Environmental);
    //   })
    //
    //   this.setState( { chartData: data, chartLabels: data, max: 5000 } );
    //
    //   // var labels = this.state.data.map(function(obj) {
    //   //   return obj.Environmental.temperature;
    //   // })
    //   //
    //   // this.setState( { chartData: data} );
    // }


  }

  render() {

  return (

      <div> <h3>Historical ***TESTING****</h3>

        <div className="historyContainer">

          <div className="historySelect">
            <div onClick={ () => this.getData('Solar Controller Monitor', 'current', 0, 4000 ) }>***select***</div>
          </div>


          <HistoryGraph chartLabels={this.state.chartLabels} chartData={this.state.chartData} />


          <div className="sliderContainer">
             <Slider min={0} max={200} defaultValue={3}  />
          </div>

        </div>

      </div>
    )
  }
}
export default History;
