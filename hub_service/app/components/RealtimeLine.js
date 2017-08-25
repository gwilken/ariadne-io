import React from "react";
import History2 from "./History2";
import {Line} from 'react-chartjs-2';

class RealtimeLine extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      history: null,
      data: []
    }

    this.handleClick = this.handleClick.bind(this);
    this.deleteHistory = this.deleteHistory.bind(this);
    this.didLoad = this.didLoad.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    fetch(`/telemetry/${this.props.family}/${this.props.displayName}/30`)
      .then((res) => res.json())
        .then((obj) => {
            this.didLoad(obj);
        });
  };

  didLoad(obj) {
    this.setState({
        data: obj.data
      });


    setInterval( function() {
      fetch(`/telemetry/${this.props.family}/${this.props.displayName}/30`)
        .then((res) => res.json())
          .then((obj) => {
              this.refresh(obj);
          }).bind(this);
    }, 30000)
  }

  refresh(obj) {
    this.setState({
        data: obj.data
      });
  }

  handleClick() {
    var obj = {
      family: this.props.family,
      displayName: this.props.displayName,
      unit: this.props.unit,
      color: this.props.color
    }

    this.setState({ history: (<History2 view={obj} handleClick={this.deleteHistory} />) } );
  }

  deleteHistory() {
    this.setState({history: null});
  }

  render() {

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
              backgroundColor: this.props.color,
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
            height={140}
        />
      )
    }


    return(

      <div>

        <div className="graphContainer">

        {chart}

          <div className="titlebar">
            <div className="title">{this.props.displayName}</div>
            <div className="rtData">{this.props.data} {this.props.unit}</div>
          </div>
        </div>

        {this.state.history}

      </div>

    )
  }

}

export default RealtimeLine;
