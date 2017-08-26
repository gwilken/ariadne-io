import React from "react";
import RealtimeLine from "./RealtimeLine";

class Gps extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var latitude = this.props.data[0].data[0].data[0];
    var longitude = this.props.data[0].data[0].data[1];
    var speed = this.props.data[0].data[1].data;
    var tmg = this.props.data[0].data[2].data;
    var siv = this.props.data[0].data[3].data;

    return (

      <div> <h2>Geospatial</h2>

          <div className="geoContainer">

            <RealtimeLine
              data={speed}
              family={this.props.data[0].family}
              displayName={this.props.data[0].data[1].displayName}
              unit={this.props.data[0].data[1].unit}
              color={this.props.color}
              range={{low: 0, high: 10}}
            />

            <RealtimeLine
              data={siv}
              family={this.props.data[0].family}
              displayName={this.props.data[0].data[3].displayName}
              unit={null}
              color={this.props.color}
              range={{low: 0, high: 12}}
            />

            <h5 className="geoLocation">Current Location: {latitude}, {longitude}</h5>

          </div>

      </div>
    )
  }
}
export default Gps;
