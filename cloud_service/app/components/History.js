import React from "react";
import {Line} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';
import Slider from 'react-rangeslider';
// import 'react-rangeslider/lib/index.css';

class History extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      family: this.props.view.family,
      displayName: this.props.view.displayName,
      color: this.props.view.color,
      time: 180,
      value: 1,
      data: []
    }

    this.didLoad = this.didLoad.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    fetch(`/telemetry/${this.state.family}/${this.state.displayName}/${this.state.time}`)
      .then((res) => res.json())
        .then((docs) => {
            this.didLoad(docs);
        });
  };

  didLoad(docs) {
    this.setState({data: docs});
  }

  handleOnChange(value) {
  //  console.log('change complete');
    this.setState({value: value});
  }

  render() {

    console.log(this.state.value);

    var val = this.state.value;

    var chart = null;

    var options = {
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
              lineTension: 0.1,
              pointRadius: 0,
              data: this.state.data
            }
         ]
      }

      chart = (
        <Line data={data}
            options={options}
            width={800}
            height={465}
        />
      )
    }
    return(

      <div className="historyContainer">


        <div className="historyGraph">

        {chart}

        </div>

        {/* .rangeslider-horizontal .rangeslider__fill */}

        <div className='slider-group'>
          <div className='rangeslider-horizontal rangeslider-reverse'>

            <Slider
                  min={0}
                  max={2400}
                  value={val}
                  tooltip={0}
                  reverse={1}
                  orientation="horizontal"
                  onChange={this.handleOnChange}
                />

          </div>
          <div className="slider-value">
            {val}
          </div>
        </div>

      </div>
    )
  }

}

export default History;
