import React from "react";
import {HorizontalBar} from 'react-chartjs-2';


// busvoltage: 13.636
// current
// :
// 3638
// family
// :
// "Energy"
// loadvoltage
// :
// 13.65741
// name
// :
// "Solar Controller Monitor"
// shuntvoltage
// :
// 21.41


const chartOptions = {
//onClick: graphClickEvent,
  maintainAspectRatio: false,
  hover: {
    animationDuration: 0
  },
  legend: {
    display: false
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
  }],
  xAxes: [{
    display: false
  }]
  }
}


class Test extends React.Component {

  constructor(props) {
    super(props);

    console.log(props);

    this.state = {

      // data: {
      //   labels: this.props.obj.titles,
      //   datasets: [
      //     {
      //       label: 'Price',
      //       data: this.props.obj.prices,
      //       backgroundColor: 'cyan',
      //       borderWidth: 1
      //     }
      // ]
      // }

    }

  }

  // handleUpdate(event) {
  //   this.props.update(event.target.value);
  // }
  //
  // handleDelete(event) {
  //   this.props.delete(event.target.value);
  // }


  // prettyTime() {
  //   var updated = moment(this.state.updatedAt).calendar();
  //   return(updated);
  // }

  render() {
    return(

      <div>test rendered</div>

      // <div>
      //   <div className="graphContainer">
      //
      //     <Bar data={this.state.data}
      //         options={chartOptions}
      //         width={800}
      //         height={110}
      //     />
      //
      //   </div>
      //
      //   <div className="titlebar">
      //     <span className="search-title"> {this.state.target} </span>
      //
      //   </div>
      //
      // </div>

    )
  }

}

export default Test;
