import React from "react";
import RealtimeLine from "./RealtimeLine";

class MotorBatts extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var batt1Comp,
        batt2Comp,
        batt3Comp,
        batt4Comp = null;

    var motorBatt1 = this.props.data.filter((elem) => {return elem.displayName === 'Motor Battery 1'});

    if(motorBatt1.length > 0) {
      batt1Comp = (
        <RealtimeLine
          data={motorBatt1[0].data[0].data.toFixed(3)}
          family={this.props.data[0].family}
          displayName={motorBatt1[0].data[0].displayName}
          unit={motorBatt1[0].data[0].unit}
          color={this.props.color}
          range={{low: 10, high: 14.5}}
        />
      )
    }

    var motorBatt2 = this.props.data.filter((elem) => {return elem.displayName === 'Motor Battery 2'});

    if(motorBatt2.length > 0) {
      batt2Comp = (
        <RealtimeLine
          data={motorBatt2[0].data[0].data.toFixed(3)}
          family={this.props.data[0].family}
          displayName={motorBatt2[0].data[0].displayName}
          unit={motorBatt2[0].data[0].unit}
          color={this.props.color}
          range={{low: 10, high: 14.5}}
        />
      )
    }

    var motorBatt3 = this.props.data.filter((elem) => {return elem.displayName === 'Motor Battery 3'});

    if(motorBatt3.length > 0) {
      batt3Comp = (
        <RealtimeLine
          data={motorBatt3[0].data[0].data.toFixed(3)}
          family={this.props.data[0].family}
          displayName={motorBatt3[0].data[0].displayName}
          unit={motorBatt3[0].data[0].unit}
          color={this.props.color}
          range={{low: 10, high: 14.5}}
        />
      )
    }

    var motorBatt4 = this.props.data.filter((elem) => {return elem.displayName === 'Motor Battery 4'});

    if(motorBatt4.length > 0) {
      batt4Comp = (
        // <RealtimeLine
        //   data={motorBatt4[0].data[0].data.toFixed(3)}
        //   family={this.props.data[0].family}
        //   displayName={motorBatt4[0].data[0].displayName}
        //   unit={motorBatt4[0].data[0].unit}
        //   color={this.props.color}
        //   range={{low: 10, high: 14.5}}
        // />
      )
    }

    return (
      <div>

        <h2>Motor Batteries</h2>

          {batt1Comp}

          {batt2Comp}

          {batt3Comp}

          {/* {batt4Comp} */}

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
