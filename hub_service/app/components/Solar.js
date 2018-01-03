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

    var solar =
       this.props.data.filter((elem) => elem.displayName === 'Solar')
       .reduce((acc, val) => val.concat(acc), 0)
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
          />
         )

       });

    return (

      <div>

        <h2>Solar</h2>

        <div className="family-container">

          {solar}

        </div>
      </div>
    )
  }
}

export default Solar;
