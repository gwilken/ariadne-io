import React from "react";
import RealtimeLine from "./RealtimeLine";

class Enviro extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var enviro =
       this.props.data.filter((elem) => elem.displayName === 'Environmental')
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

      <h2>Environmental</h2>

      <div className="family-container">

        {enviro}

      </div>
    </div>
  )
  }
}
export default Enviro;
