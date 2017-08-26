import React from "react";
import MotorBattery from "./MotorBattery";
import RealtimeLine from "./RealtimeLine";


class MotorBatteryGroup extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var motorBatt1 = this.props.data.filter((elem) => {return elem.displayName === 'Motor Battery 1'});
    var motorBatt2 = this.props.data.filter((elem) => {return elem.displayName === 'Motor Battery 2'});
    var motorBatt3 = this.props.data.filter((elem) => {return elem.displayName === 'Motor Battery 3'});
    var motorBatt4 = this.props.data.filter((elem) => {return elem.displayName === 'Motor Battery 4'});

    return (
      <div>

        <h2>Motor Batteries</h2>

          <MotorBattery
            data={motorBatt1}
          />

          <MotorBattery
            data={motorBatt2}
          />

          <MotorBattery
            data={motorBatt3}
          />

          <MotorBattery
            data={motorBatt4}
          />

      </div>
    );

  }
}

export default MotorBatteryGroup;
