import React from "react";
import History2 from "./History2";
import {HorizontalBar} from 'react-chartjs-2';

class RealtimeBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      history: null
    }

    this.handleClick = this.handleClick.bind(this);
    this.deleteHistory = this.deleteHistory.bind(this);
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

    const data = {
        labels: [this.props.data],
        datasets: [
            {
              labels: '',
              data: [this.props.data],
              backgroundColor: [this.props.color]
            }
         ]
       };

    const options = {
      onClick: this.handleClick,
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
            min: this.props.range.low,
            max: this.props.range.high,
          },
          gridLines: {
            display: false,
            drawTicks: true,
          },
        }]
      }
    }


    return(

      <div>

        <div className="graphContainer">

          <HorizontalBar
              data={data}
              options={options}
              width={800}
              height={140}
          />

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

export default RealtimeBar;
