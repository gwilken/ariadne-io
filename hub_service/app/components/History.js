import React from "react";
import {Line} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';
import Slider from 'react-rangeslider';
import moment from 'moment';

class History extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      family: this.props.view.family,
      displayName: this.props.view.displayName,
      color: this.props.view.color,
      unit: this.props.view.unit,
      time: 180,
      chartHeight: Math.floor(window.innerHeight * .33),
      data: [],
      average: null,
      high: null,
      low: null
    }

    this.didLoad = this.didLoad.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnChangeComplete = this.handleOnChangeComplete.bind(this);
  }

  componentDidMount() {
    fetch(`/telemetry/${this.state.family}/${this.state.displayName}/${this.state.time}`)
      .then((res) => res.json())
        .then((obj) => {
          console.log(obj);
            this.didLoad(obj);
        });
  };

  didLoad(obj) {
    this.setState({
        data: obj[0].data,
        high: obj[0].high,
        low: obj[0].low,
        average: obj[0].average
      });
  }

  handleClick(event) {
    event.preventDefault();
    this.props.handleClick();
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
    var displayTime = moment(Date.now() - time * 60000).fromNow(true);
    var formatTime = () => displayTime;

    var chart = null;

    var options = {
      animation: {
        duration: 300,
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
              lineTension: 0.2,
              pointRadius: 0,
              data: this.state.data
            }
         ]
      }

      chart = (
        <Line data={data}
            options={options}
            width={800}
            height={this.state.chartHeight}
        />
      )
    }

    var styleObj = {
      backgroundColor: this.state.color
    }


    return(

      <div className="family-container">

        <h3>{displayTime}</h3>

        <div className="historyContainer">
          <div className="historyGraph" onClick={this.handleClick}>
            {chart}
          </div>

          <div className="history-info-container">
            <div className="history-info">
              <h4 className="history-info-text">Low: {this.state.low} {this.state.unit}</h4>
              <h4 className="history-info-text">High: {this.state.high} {this.state.unit}</h4>
              <h4 className="history-info-text">Average: {this.state.average} {this.state.unit}</h4>
            </div>
          </div>

          <div className='slider-group'>
            <div className='rangeslider-horizontal' style={styleObj}>
              <Slider
                min={5}
                max={1440}
                value={time}
                tooltip={1}
                format={formatTime}
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
