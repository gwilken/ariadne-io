import React from "react";
import {Line} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';
// import Trend fomr './Trend';
import Slider from 'react-rangeslider';
// import 'react-rangeslider/lib/index.css';

class History extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      family: this.props.view.family,
      displayName: this.props.view.displayName,
      color: this.props.view.color,
      unit: this.props.view.unit,
      time: 180,
      data: [],
      trend: [],
      average: null,
      high: null,
      low: null
    }

    this.didLoad = this.didLoad.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnChangeComplete = this.handleOnChangeComplete.bind(this);
  }

  componentDidMount() {
    fetch(`/telemetry/${this.state.family}/${this.state.displayName}/${this.state.time}`)
      .then((res) => res.json())
        .then((docs) => {
            this.didLoad(docs);
        });
  };

  didLoad(docs) {
    var graphData = docs[0].slice();
    var trendData = docs[1].slice();

    this.setState({data: [] });
    this.setState({data: graphData});
    this.setState({trend: trendData});

    var sorted = graphData.sort((a, b) => { return a - b; } );
    var average = graphData.reduce((sum, val) => { return sum + val }) / graphData.length;

    this.setState({
      average: average.toFixed(0),
      high: sorted[graphData.length - 1].toFixed(0),
      low: sorted[0].toFixed(0)
    })
  }

  handleOnChange(value) {
    this.setState({time: value});
  }

  handleOnChangeComplete() {
    fetch(`/telemetry/${this.state.family}/${this.state.displayName}/${this.state.time}`)
      .then((res) => res.json())
        .then((docs) => {
            this.didLoad(docs);
        });
  }

  render() {

    var time = this.state.time;
    var chart = null;
    var trend = null;

    var options = {
      animation: {
        duration: 600,
        easing: 'linear',
      },
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
      scales: {
        yAxes: [{
          position: 'right',
          ticks: {
            mirror: false,
           },
          }],
        xAxes: [{
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
    };

    if(this.state.data.length > 0) {
      var data = {
        labels: this.state.data,
        datasets: [
            {
              fill: true,
              backgroundColor: this.state.color,
              borderWidth: 2,
              lineTension: 0.4,
              pointRadius: 0,
              data: this.state.data
            }
         ]
      }

      chart = (
        <Line data={data}
            options={options}
            width={800}
            height={550}
        />
      )
    }

    if(this.state.trend.length > 0) {
      var trendData = {
        labels: this.state.trend,
        datasets: [
            {
              fill: true,
              backgroundColor: this.state.color,
              borderWidth: 2,
              lineTension: .4,
              pointRadius: 0,
              data: this.state.trend
            }
         ]
      }

      trend = (
        <Line data={trendData}
            options={options}
            width={400}
            height={300}
        />
      )
    }



    return(

      <div>
        <h3>{ this.state.displayName} - Last {time} Minutes</h3>

        <div className="historyContainer">
          <div className="historyGraph">

          {chart}

          </div>

          <div className="history-info-container">

            <div className="history-info">
              <h4>Average: {this.state.average} {this.state.unit}</h4>
              <h4>High: {this.state.high} {this.state.unit}</h4>
              <h4>Low: {this.state.low} {this.state.unit}</h4>
            </div>

            <div className="trend-container">
              {trend}
            </div>

          </div>

          <div className='slider-group'>
            <div className='rangeslider-horizontal'>

              <Slider
                min={5}
                max={1440}
                value={time}
                tooltip={0}
                orientation="horizontal"
                onChange={this.handleOnChange}
                onChangeComplete={this.handleOnChangeComplete}
              />

            </div>

          </div>

        </div>

      </div>

    )
  }

}

export default History;
