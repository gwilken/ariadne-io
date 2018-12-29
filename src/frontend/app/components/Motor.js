import React from "react";
import RealtimeLine from "./RealtimeLine";

class Motor extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var motor =
       this.props.data.filter((elem) => elem.displayName === 'Electric Yacht 10kW Motor')
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
          />
         )

       });


    return (

      <div>
        <h2>Electric Motor</h2>

          <div className="family-container">

            {motor}

        </div>
      </div>
      )
  }
}

export default Motor;
