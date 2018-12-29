import React from "react";
import History from "./History";
import RealtimeLine from "./RealtimeLine"

class House extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

   var house =
      this.props.data.filter((elem) => elem.displayName === 'House')
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

    // var beer =
    //    this.props.data.filter((elem) => elem.displayName === 'Refrigerator')
    //    .reduce(((acc, val) => val.concat(acc)), 0)
    //    .data
    //    .map((item) => {
    //
    //      return (
    //        <RealtimeLine
    //         history={this.props.history}
    //         data={item.data.toFixed(2)}
    //         family={this.props.data[0].family}
    //         displayName={item.displayName}
    //         unit={item.unit}
    //         color={this.props.color}
    //         range={{low: 10, high: 14.5}}
    //       />
    //      )
    //
    //    });


    return (

      <div>
        <h2>House</h2>

        <div className="family-container">

          {house}

        </div>
      </div>

    )
  }
}

export default House;
