import React from "react";
import {Bar} from 'react-chartjs-2';

class Motor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ey: null,
      batt1: null,
      batt2: null,
      batt3: null,
      batt4: null
    }
  }

  componentWillMount() {
    var obj = {};
    var data = {
      busvoltage: 0
    }

    this.setState( { motor: Object.assign( {}, this.state.motor, { batt1: data } ) } );
    this.setState( { motor: Object.assign( {}, this.state.motor, { batt2: data } ) } );
    this.setState( { motor: Object.assign( {}, this.state.motor, { batt3: data } ) } );
    this.setState( { motor: Object.assign( {}, this.state.motor, { batt4: data } ) } );
  }

  componentWillReceiveProps(nextProps) {

      if(nextProps.data.batt1) {
        this.setState( { batt1: nextProps.data.batt1 } );
      }
      if(nextProps.data.batt2) {
        this.setState( { batt2: nextProps.data.batt2 } );
      }
      if(nextProps.data.batt3) {
        this.setState( { batt3: nextProps.data.batt3 } );
      }
      if(nextProps.data.batt4) {
        this.setState( { batt4: nextProps.data.batt4 } );
      }

    }


  render() {

    var content = ( <div> *** TEST *** </div> );


    if(this.state.batt1 && this.state.batt2 && this.state.batt3 && this.state.batt4 ) {
        console.log('1', this.props.data.batt1.busvoltage);
        console.log('2', this.props.data.batt2.busvoltage);
        console.log('3', this.props.data.batt3.busvoltage);
        console.log('4', this.props.data.batt4.busvoltage);
    }



    // if(this.state) {
    //
    //   var data = {
    //     labels: [this.props.data.batt1.busvoltage],
    //     datasets: [
    //       {
    //         label: 'My First dataset',
    //         backgroundColor: 'rgba(255,99,132,0.2)',
    //         borderColor: 'rgba(255,99,132,1)',
    //         borderWidth: 1,
    //         hoverBackgroundColor: 'rgba(255,99,132,0.4)',
    //         hoverBorderColor: 'rgba(255,99,132,1)',
    //         data: [this.props.data.batt1.busvoltage]
    //       }
    //     ]
    //   };
    //
    //
    // var currentGraphData = {
    //   labels: currentData,
    //   datasets: [
    //       {
    //         fill: true,
    //         backgroundColor: 'yellow',
    //         borderWidth: 2,
    //         lineTension: 0.1,
    //         pointRadius: 0,
    //         data: currentData
    //       }
    //    ]
    // }
    //
    // var currentChartOptions = {
    //   layout: {
    //     padding: {
    //       left: 15,
    //       right: 3,
    //     },
    //   },
    //   tooltips: {
    //     enabled: false,
    //   },
    //   legend: {
    //     display: false,
    //     position: 'top',
    //   },
    //   animation: {
    //     duration: 100,
    //     easing: 'linear'
    //   },
    //   maintainAspectRatio: false,
    //   scales: {
    //     yAxes: [{
    //       position: 'right',
    //       ticks: {
    //         min: 0,
    //         max: 5000,
    //         mirror: false,
    //        },
    //       }],
    //     xAxes: [{
    //       ticks: {
    //         min: 0,
    //         max: 0,
    //       },
    //       gridLines: {
    //         display: false,
    //         drawTicks: false,
    //       },
    //       scaleLabel: {
    //         display: true,
    //       },
    //       ticks: {
    //         display: false,
    //       },
    //     },
    //     ],
    //   },
    // }
    //
    // content = (
    //
    //   <div> <h3>Motor</h3>
    //     <div>
    //       <div className="graphContainer">
    //
    //         <Bar data={data}
    //           options={{maintainAspectRatio: false}}
    //             width={800}
    //             height={140}
    //         />
    //
    //         <div className="titlebar">
    //           <div className="title">Motor Batts</div>
    //           {/* <div className="rtData"> {this.props.data.current} mA </div> */}
    //         </div>
    //
    //       </div>
    //
    //
    //       {/* <div className="graphContainer">
    //         <Line data={voltGraphData}
    //             options={voltChartOptions}
    //             width={800}
    //             height={140}
    //         />
    //
    //         <div className="titlebar">
    //           <div className="title"> Volts</div>
    //           <div className="rtData"> {this.props.data.loadvoltage} V </div>
    //         </div>
    //       </div> */}
    //
    //     </div>
    //   </div>
    //   )
    // }

    return content;
  }
}

export default Motor;
