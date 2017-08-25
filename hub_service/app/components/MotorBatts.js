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
    //
    // var battery1 = this.props.data.filter((elem) => {return elem.displayName === 'Battery 1'});
    // var battery2 = this.props.data.filter((elem) => {return elem.displayName === 'Battery 2'});
    // var battery3 = this.props.data.filter((elem) => {return elem.displayName === 'Battery 3'});
    // var battery4 = this.props.data.filter((elem) => {return elem.displayName === 'Battery 4'});
    //
    // if(battery1.length > 0) var battery1_volts = battery1[0].data[0].data.toFixed(2);
    // if(battery2.length > 0) var battery2_volts = battery2[0].data[0].data.toFixed(2);
    // if(battery3.length > 0) var battery3_volts = battery3[0].data[0].data.toFixed(2);
    // if(battery4.length > 0) var battery4_volts = battery4[0].data[0].data.toFixed(2);

    console.log(motorBatt1);

    return (
      <div>

        <h2>Motor Batteries</h2>

          <RealtimeLine
            data={motorBatt1Voltage[0].data}
            family={this.props.data[0].family}
            displayName={motorBatt1Voltage[0].displayName}
            unit={motorBatt1Voltage[0].unit}
            color={this.props.color}
            range={{low: 46, high: 58}}
          />

    </div>
    );

  }
}

export default MotorBatts;
