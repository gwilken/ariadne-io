import React from "react";
import {Line} from 'react-chartjs-2';

class Solar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      current: []
    }
  }

  componentWillMount() {
    fetch('/sensor/Solar Controller Monitor')
      .then((res) => res.json())
        .then(function(data) {

          var arr = [];
          arr = data.slice();

          this.setState( { current: arr} );

        }.bind(this));
  }

  componentDidMount() {
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

    var graphData = {
      labels: this.state.current,
      datasets: [
          {
            fill: true,
            backgroundColor: 'yellow',
            borderWidth: 2,
            lineTension: 0.3,
            pointRadius: 0,
            data: this.state.current
          }
       ]
    }

    var chartOptions = {
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

    return(
      <div>
        {/* <div className="graphContainer">

          <Line data={graphData}
              options={chartOptions}
              width={800}
              height={150}
          />

        </div>

        <div className="titlebar">

          <div className="title"> House Battery Amps</div>

          <div className="rtData"> {this.props.data.current} mV </div>

        </div> */}

      </div>
    )
  }

}

export default Solar;
