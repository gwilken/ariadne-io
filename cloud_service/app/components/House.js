import React from "react";
import {Line} from 'react-chartjs-2';

class House extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null
    }
  }

  componentDidMount() {
    fetch('/sensor/House Battery Bank/10')
      .then((res) => res.json())
        .then(function(objs) {
          //console.log(objs);
          this.setState( { data: objs} );
        }.bind(this));
  }

  componentWillReceiveProps(nextProps) {

    if(this.state) {
      if(nextProps.data) {

        var newState = this.state.data.slice();
        newState.push(nextProps.data);
        newState.shift();

        this.setState({data: newState});
      }
    }
  }

  render() {

    var content = ( <div></div> );

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
            backgroundColor: 'royalblue',
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
            backgroundColor: 'royalblue',
            // borderColor: 'yellow',
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

      <div> <h3>House</h3>
        <div>

          <div className="graphContainer">
            <Line data={voltGraphData}
                options={voltChartOptions}
                width={800}
                height={140}
            />

            <div className="titlebar">

              <div className="title">Battery Voltage:</div>
              <div className="rtData"> {this.props.data.loadvoltage.toFixed(2) + 'v'} </div>

            </div>
          </div>

          <div className="graphContainer">
            <Line data={currentGraphData}
                options={currentChartOptions}
                width={800}
                height={140}
            />

            <div className="titlebar">
              <div className="title">Current Usage:</div>
              <div className="rtData"> {this.props.data.current + ' mA'}</div>
            </div>
          </div>



        </div>
      </div>
      )
    }

    return content;
  }
}

export default House;
