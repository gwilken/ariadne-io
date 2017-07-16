import React from "react";
//import {Line} from 'react-chartjs-2';
import {HorizontalBar} from 'react-chartjs-2';


class House extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      color: 'royalblue'
    }
  }

  componentDidMount() {
    // fetch('/telemetry/100')
    //   .then((res) => res.json())
    //     .then(function(objs) {
    //       console.log(objs);
    //       //this.setState( { data: objs} );
    //     }.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    //
    // if(this.state) {
    //   if(nextProps.data) {
    //
    //     var newState = this.state.data.slice();
    //     newState.push(nextProps.data);
    //     newState.shift();
    //
    //     this.setState({data: newState});
    //   }
    // }
  }

  render() {

    console.log(this.props.data[0]);

    // var currentData = [];
    // var voltData = [];

    var volts = this.props.data[0].data[0].data.toFixed(2); + this.props.data[0].data[0].unit;
    var current = this.props.data[0].data[1].data.toFixed(0); + this.props.data[0].data[1].unit;

    // voltData.push(this.props.data[0].data[0].data.toFixed(2))
    // currentData.push(this.props.data[0].data[1].data.toFixed(0));


    // var rtVolt = this.props.data.loadvoltage.toFixed(2) + ' v';
    // var rtCurrent = this.props.data.current.toFixed(2) + ' mA';
    //
    // var lastObj = this.state.data.length - 1;
    //
    // var currentData = this.state.data.map(function(obj) {
    //   return(obj.current);
    // })
    //
    // var voltData = this.state.data.map(function(obj) {
    //   return(obj.loadvoltage);
    // })

    var voltsGraphData = {
        labels: [volts],
        datasets: [
            {
              labels: '',
              data: [volts],
              backgroundColor: [this.state.color]
            }
         ]
       };

    var voltsGraphOptions = {
    layout: {
      padding: {
        left: 15,
      },
    },
    tooltips: {
      enabled: false,
    },
    legend: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 0,
          display: false,
        },
        barThickness: 140,
        display: false,
      }],
      xAxes: [{
        ticks: {
          min: 10,
          max: 14.5,
        },
        gridLines: {
          display: false,
          drawTicks: true,
        },
      }]
    }
    }

    var currentGraphData = {
        labels: [current],
        datasets: [
            {
              labels: '',
              data: [current],
              backgroundColor: [this.state.color]
            }
         ]
       };

    var currentGraphOptions = {
    layout: {
      padding: {
        left: 15,
      },
    },
    tooltips: {
      enabled: false,
    },
    legend: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 0,
          display: false,
        },
        barThickness: 140,
        display: false,
      }],
      xAxes: [{
        ticks: {
          min: 0,
          max: 10000,
        },
        gridLines: {
          display: false,
          drawTicks: true,
        },
      }]
    }
    }


    // var currentGraphData = {
    //   labels: currentData,
    //   datasets: [
    //       {
    //         fill: true,
    //         backgroundColor: 'royalblue',
    //         borderWidth: 2,
    //         lineTension: 0.1,
    //         pointRadius: 0,
    //         data: currentData
    //       }
    //    ]
    // }
    //
    // var voltGraphData = {
    //   labels: voltData,
    //   datasets: [
    //       {
    //         fill: true,
    //         backgroundColor: 'royalblue',
    //         // borderColor: 'yellow',
    //         borderWidth: 2,
    //         lineTension: 0.1,
    //         pointRadius: 0,
    //         data: voltData
    //       }
    //    ]
    // }

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
    //     // duration: 100,
    //     easing: 'linear'
    //   },
    //   maintainAspectRatio: false,
    //   scales: {
    //     yAxes: [{
    //       position: 'right',
    //       ticks: {
    //         min: 0,
    //         max: 7500,
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
    // var voltChartOptions = {
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
    //     // duration: 100,
    //     easing: 'linear'
    //   },
    //   maintainAspectRatio: false,
    //   scales: {
    //     yAxes: [{
    //       position: 'right',
    //       ticks: {
    //         min: 0,
    //         max: 14.5,
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

    return (

      <div> <h3>{this.props.data[0].displayName}</h3>
        <div>

          <div className="graphContainer">
            <HorizontalBar data={voltsGraphData}
                options={voltsGraphOptions}
                width={800}
                height={140}
            />

            <div className="titlebar">

              <div className="title">Battery Voltage</div>
              <div className="rtData"> {volts} </div>

            </div>
          </div>

          <div className="graphContainer">
            <HorizontalBar data={currentGraphData}
                options={currentGraphOptions}
                width={800}
                height={140}
            />

            <div className="titlebar">
              <div className="title">Current Usage</div>
              <div className="rtData"> {current}</div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}
export default House;
