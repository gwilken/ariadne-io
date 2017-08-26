import React from "react";
import RealtimeLine from "./RealtimeLine";

class MotorBatts extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var motorBatt1 = this.props.data.filter((elem) => {return elem.displayName === 'Motor Battery 1'});
    var motorBatt2 = this.props.data.filter((elem) => {return elem.displayName === 'Motor Battery 2'});
    var motorBatt3 = this.props.data.filter((elem) => {return elem.displayName === 'Motor Battery 3'});
    var motorBatt4 = this.props.data.filter((elem) => {return elem.displayName === 'Motor Battery 4'});

    if(motorBatt1.length > 0) {
      var motorBatt1Voltage = motorBatt1[0].data.filter((elem) => {return elem.sensor === "voltage"});
    }

    if(motorBatt2.length > 0) {
      var motorBatt2Voltage = motorBatt2[0].data.filter((elem) => {return elem.sensor === "voltage"});
    }

    if(motorBatt3.length > 0) {
      var motorBatt3Voltage = motorBatt3[0].data.filter((elem) => {return elem.sensor === "voltage"});
    }

    if(motorBatt4.length > 0) {
      var motorBatt4Voltage = motorBatt4[0].data.filter((elem) => {return elem.sensor === "voltage"});
    }

    console.log(this.props.data[0].family);
    console.log(motorBatt2Voltage[0].displayName);
    //console.log(this.props.data[0].family);

    return (
      <div>

        <h2>Motor Batteries</h2>

          <RealtimeLine
            data={motorBatt1Voltage[0].data}
            family={this.props.data[0].family}
            displayName={motorBatt1Voltage[0].displayName}
            unit={motorBatt1Voltage[0].unit}
            color={this.props.color}
            range={{low: 10, high: 14.5}}
          />

          <RealtimeLine
            data={motorBatt2Voltage[0].data}
            family={this.props.data[0].family}
            displayName={motorBatt2Voltage[0].displayName}
            unit={motorBatt2Voltage[0].unit}
            color={this.props.color}
            range={{low: 10, high: 14.5}}
          />

          <RealtimeLine
            data={motorBatt3Voltage[0].data}
            family={this.props.data[0].family}
            displayName={motorBatt3Voltage[0].displayName}
            unit={motorBatt3Voltage[0].unit}
            color={this.props.color}
            range={{low: 10, high: 14.5}}
          />

          <RealtimeLine
            data={motorBatt4Voltage[0].data}
            family={this.props.data[0].family}
            displayName={motorBatt4Voltage[0].displayName}
            unit={motorBatt4Voltage[0].unit}
            color={this.props.color}
            range={{low: 10, high: 14.5}}
          />

    </div>
    );

  }
}

export default MotorBatts;