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

    return (
      <div>

        <h2>Motor Batteries</h2>

          <RealtimeLine
            data={motorBatt1[0].data[0].data.toFixed(3)}
            family={this.props.data[0].family}
            displayName={motorBatt1[0].data[0].displayName}
            unit={motorBatt1[0].data[0].unit}
            color={this.props.color}
            range={{low: 10, high: 14.5}}
          />

          <RealtimeLine
            data={motorBatt2[0].data[0].data.toFixed(3)}
            family={this.props.data[0].family}
            displayName={motorBatt2[0].data[0].displayName}
            unit={motorBatt2[0].data[0].unit}
            color={this.props.color}
            range={{low: 10, high: 14.5}}
          />

          <RealtimeLine
            data={motorBatt3[0].data[0].data.toFixed(3)}
            family={this.props.data[0].family}
            displayName={motorBatt3[0].data[0].displayName}
            unit={motorBatt3[0].data[0].unit}
            color={this.props.color}
            range={{low: 10, high: 14.5}}
          />

          <RealtimeLine
            data={motorBatt4[0].data[0].data.toFixed(3)}
            family={this.props.data[0].family}
            displayName={motorBatt4[0].data[0].displayName}
            unit={motorBatt4[0].data[0].unit}
            color={this.props.color}
            range={{low: 10, high: 14.5}}
          />

      </div>
    );

  }
}

export default MotorBatts;
