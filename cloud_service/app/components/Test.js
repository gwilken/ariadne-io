import React from "react";
import {line} from 'react-chartjs-2';






class Test extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      current: []
    }
  }

  componentWillMount() {
    fetch('/history/solar/current')
      .then((res) => res.json())
        .then(function(data) {
          console.log(data);

          this.setState({ current: data });

        }.bind(this));
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    // if(nextProps.data.current) {
    // //
    // //   var newCurrent = this.state.current.slice();
    // //   newCurrent.push(nextProps);
    // //   newCurrent.shift();
    // //
    // this.setState({current: nextProps});
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
        duration: 500,
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          position: 'right',
          ticks: {
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
        <div className="graphContainer">

          <line data={graphData}
              options={chartOptions}
              width={800}
              height={150}
          />

        </div>

        <div className="titlebar">
          <span className="search-title"> {this.props.data.name} </span>

          <p> {this.props.data.current} </p>

        </div>

      </div>
    )
  }

}

export default Test;
