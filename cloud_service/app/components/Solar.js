import React from "react";
import RealtimeBar from "./RealtimeBar";
import History from "./History";

var voltsHistory = null;
var currentHistory = null;

class Solar extends React.Component {

  constructor(props) {
    super(props);

    // this.voltsClick = this.voltsClick.bind(this);
    // this.currentClick = this.currentClick.bind(this);
  }

  // voltsClick(event) {
  //   var obj = {
  //     family: this.props.data[0].family,
  //     displayName: this.props.data[0].data[0].displayName,
  //     unit: this.props.data[0].data[0].unit,
  //     color: this.props.color
  //    };
  //
  //    voltsHistory = ( <History view={obj} handleClick={ () => voltsHistory = null } /> )
  // }
  //
  // currentClick(event) {
  //   var obj = {
  //     family: this.props.data[0].family,
  //     displayName: this.props.data[0].data[1].displayName,
  //     unit: this.props.data[0].data[1].unit,
  //     color: this.props.color
  //   };
  //
  //   currentHistory = ( <History view={obj} handleClick={ () => currentHistory = null } /> )
  // }

  render() {

    var volts = this.props.data[0].data[0].data.toFixed(2);
    var current = this.props.data[0].data[1].data.toFixed(0);

    return (

      <div>

        <h2>Solar</h2>

        <div className="family-container">

          <RealtimeBar
            data={volts}
            family={this.props.data[0].family}
            displayName={this.props.data[0].data[0].displayName}
            unit={this.props.data[0].data[0].unit}
            color={this.props.color}
            range={{low: 10, high: 14.5}}
          />

          <RealtimeBar
            data={current}
            family={this.props.data[0].family}
            displayName={this.props.data[0].data[1].displayName}
            unit={this.props.data[0].data[1].unit}
            color={this.props.color}
            range={{low: 0, high: 7500}}
          />

        </div>
      </div>
    )
  }
}

export default Solar;
