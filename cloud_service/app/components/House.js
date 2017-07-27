import React from "react";
import RealtimeBar from "./RealtimeBar";
import History from "./History";

class House extends React.Component {

  constructor(props) {
    super(props);
  }

  // voltsClick(event) {
  //   var obj = {
  //     family: this.props.data[0].family,
  //     displayName: this.props.data[0].data[0].displayName,
  //     unit: this.props.data[0].data[0].unit,
  //     color: this.props.color
  //   };
  //
  //   voltsHistory = ( <History view={obj} handleClick={ () => voltsHistory = null } /> )
  // }

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

        <h2>House</h2>

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

export default House;
