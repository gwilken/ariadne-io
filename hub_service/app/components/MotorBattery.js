import React from "react";
import RealtimeLine from "./RealtimeLine";

class MotorBattery extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var volts = this.props.data[0].data[0].data.toFixed(3);

    return (
      <div>

          <RealtimeLine
            history={this.props.history}
            data={volts}
            family={this.props.data[0].family}
            displayName={this.props.data[0].data[0].displayName}
            unit={this.props.data[0].data[0].unit}
            color={this.props.color}
            range={{low: 10, high: 14.5}}
          />

      </div>
    );

  }
}

export default MotorBattery;
