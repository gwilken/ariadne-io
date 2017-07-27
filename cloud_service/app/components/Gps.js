import React from "react";
import RealtimeBar from "./RealtimeBar";

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

            <RealtimeBar
              data={speed}
              title="Speed"
              realtimedata={speed + ' Knots'}
              color={this.props.color}
              handleClick={null}
              range={{low: 0, high: 10}}
            />

            <RealtimeBar
              data={siv}
              title="Satellites in View"
              realtimedata={siv}
              color={this.props.color}
              handleClick={null}
              range={{low: 0, high: 12}}
            />


            <h5 className="geoLocation">Current Location: {latitude}, {longitude}</h5>

          </div>

      </div>
    )
  }
}
export default Gps;
