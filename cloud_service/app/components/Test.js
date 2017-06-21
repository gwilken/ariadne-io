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


class Test extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      current: []
    }
  }

  componentDidMount() {

    fetch('/history/solar/current')
      .then((res) => (function(data) {
          console.log(data);
        });

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data.current) {

      var newCurrent = this.state.current.slice();
      newCurrent.push(nextProps);
      newCurrent.shift();

      this.setState({current: newCurrent});
    }
  }

  render() {

    var graphData = {
      labels: [this.props.data.name],
      datasets: [
        {
          label: 'Current In',
          data: [this.state.current],
          backgroundColor: 'yellow',
          borderWidth: 1
        }
      ]
    }

    const chartOptions = {
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
          },
          display: false
      }],
      xAxes: [{
        display: false
      }]
      }
    }

    return(
      <div>
        <div className="graphContainer">

          <HorizontalBar data={graphData}
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
