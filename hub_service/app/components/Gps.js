import React from "react";
import RealtimeLine from "./RealtimeLine";

class Gps extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var geo =
       this.props.data.filter((elem) => elem.displayName === 'Geospatial')
       .reduce((acc, val) => val.concat(acc))
       .data
       .map((item) => {

         return (
           <RealtimeLine
            history={this.props.history}
            data={item.data.toFixed(2)}
            family={this.props.data[0].family}
            displayName={item.displayName}
            unit={item.unit}
            color={this.props.color}
            range={{low: 10, high: 14.5}}
          />
         )
       });

    return (

      <div> <h2>Geospatial</h2>

          <div className="geoContainer">

            {geo}

          </div>

      </div>
    )
  }
}
export default Gps;
