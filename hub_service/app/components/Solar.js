import React from "react";
import RealtimeLine from "./RealtimeLine";
import History from "./History";

var voltsHistory = null;
var currentHistory = null;

class Solar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var volts = this.props.data[0].data[0].data.toFixed(2);
    var current = this.props.data[0].data[1].data.toFixed(0);

    return (

      <div>

        <h2>Solar</h2>

        <div className="family-container">

          <RealtimeLine
            history={this.props.history}
            data={volts}
            family={this.props.data[0].family}
            displayName={this.props.data[0].data[0].displayName}
            unit={this.props.data[0].data[0].unit}
            color={this.props.color}
            range={{low: 10, high: 14.5}}
          />

          <RealtimeLine
            history={this.props.history}
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
