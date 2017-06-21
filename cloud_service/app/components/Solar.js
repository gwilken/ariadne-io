import React from "react";
import {Line} from 'react-chartjs-2';

class Solar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null
    }
  }

  componentDidMount() {
    fetch('/sensor/Solar Controller Monitor/5')
      .then((res) => res.json())
        .then(function(objs) {

          console.log(objs);

          this.setState( { data: objs} );

        }.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    // if(nextProps.data.current) {
    //
    //   var newCurrent = this.state.current.slice();
    //   newCurrent.push(nextProps.data.current);
    //   newCurrent.shift();
    //
    // this.setState({current: newCurrent});
    // }
  }

  render() {

    console.log(this.state);

    // var graphData = {
    //   labels: this.state.current,
    //   datasets: [
    //     {
    //       label: 'Current In',
    //       data: this.state.current,
    //       backgroundColor: 'yellow',
    //       borderWidth: 1
    //     }
    //   ]
    // }
    //
    // const chartOptions = {
    //   maintainAspectRatio: false,
    //   hover: {
    //     animationDuration: 0
    //   },
    //   legend: {
    //     display: false
    //   },
    //   scales: {
    //     yAxes: [{
    //       ticks: {
    //         beginAtZero: true
    //       },
    //       display: false
    //   }],
    //   xAxes: [{
    //     display: false
    //   }]
    //   }
    // }

var content = ( <div> test </div> );

if(this.state.data) {

  var lastObj = this.state.data.length - 1;

  var currentData = this.state.data.map(function(obj) {
    return(obj.current);
  })

  var voltData = this.state.data.map(function(obj) {
    return(obj.loadvoltage);
  })

  var currentGraphData = {
    labels: currentData,
    datasets: [
        {
          fill: true,
          backgroundColor: 'yellow',
          borderWidth: 2,
          lineTension: 0.1,
          pointRadius: 0,
          data: currentData
        }
     ]
  }

  var voltGraphData = {
    labels: voltData,
    datasets: [
        {
          fill: true,
          backgroundColor: 'yellow',
          borderWidth: 2,
          lineTension: 0.1,
          pointRadius: 0,
          data: voltData
        }
     ]
  }

  var currentChartOptions = {
    layout: {
      padding: {
        left: 15,
        right: 3,
      },
    },
    tooltips: {
      enabled: false,
    },
    legend: {
      display: false,
      position: 'top',
    },
    animation: {
      duration: 100,
      easing: 'linear'
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        position: 'right',
        ticks: {
          min: 0,
          max: 7500,
          mirror: false,
         },
        }],
      xAxes: [{
        ticks: {
          min: 0,
          max: 0,
        },
        gridLines: {
          display: false,
          drawTicks: false,
        },
        scaleLabel: {
          display: true,
        },
        ticks: {
          display: false,
        },
      },
      ],
    },
  }

  var voltChartOptions = {
    layout: {
      padding: {
        left: 15,
        right: 3,
      },
    },
    tooltips: {
      enabled: false,
    },
    legend: {
      display: false,
      position: 'top',
    },
    animation: {
      duration: 100,
      easing: 'linear'
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        position: 'right',
        ticks: {
          min: 0,
          max: 14.5,
          mirror: false,
         },
        }],
      xAxes: [{
        ticks: {
          min: 0,
          max: 0,
        },
        gridLines: {
          display: false,
          drawTicks: false,
        },
        scaleLabel: {
          display: true,
        },
        ticks: {
          display: false,
        },
      },
      ],
    },
  }


  content = (
      <div>
        <div className="graphContainer">
          <Line data={currentGraphData}
              options={currentChartOptions}
              width={800}
              height={150}
          />
        </div>

        <div className="titlebar">
          <div className="title"> Amps Producing</div>
          <div className="rtData"> {this.state.data[lastObj].current} mA </div>
        </div>


        <div className="graphContainer">
          <Line data={voltGraphData}
              options={voltChartOptions}
              width={800}
              height={150}
          />
        </div>

        <div className="titlebar">
          <div className="title"> Volts</div>
          <div className="rtData"> {this.state.data[lastObj].loadvoltage} V </div>
        </div>

      </div>
    )
  }

    return content;
  }
}

export default Solar;
