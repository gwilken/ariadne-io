import React from "react";
import History from "./History";
import {Line} from 'react-chartjs-2';

class RealtimeLine extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      history: null,
      ticker: [],
      data: []
    }

    this.handleClick = this.handleClick.bind(this);
    this.deleteHistory = this.deleteHistory.bind(this);
    this.didLoad = this.didLoad.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {

    // var mapDocs = this.props.history().map((elem) => {
    //   return elem.telemetry;
    // })

    // var familyDocs = this.props.history().map((elem) => {
    //   return elem.filter((elem2) => {
    //       return elem2.family === this.props.family;
    //     })
    // })

    // var res = [];
    //
    // familyDocs.forEach((elem) => {
    //   elem.forEach((elem2) => {
    //     elem2.data.forEach((elem3) => {
    //       if(elem3.displayName === this.props.displayName) {
    //         res.push(elem3)
    //       }
    //     });
    //   });
    // })

    // var data = res.map((elem) => {
    //   return elem.data;
    // })

    this.setState({data: this.getHistory(this.props.family, this.props.displayName)});

    setInterval( this.refresh, 10000);

  };

  didLoad(obj) {
    this.setState({
        data: obj[0].data
      });
    setInterval( this.refresh, 10000);
  }

  componentWillReceiveProps() {
    var tempArr = this.state.data.slice();
    tempArr.push(this.props.data);
    tempArr.shift();
    this.setState({ticker: tempArr});
  }

  refresh() {
    this.setState({data: this.state.ticker.slice()})
  }

  handleClick() {
    var obj = {
      family: this.props.family,
      displayName: this.props.displayName,
      unit: this.props.unit,
      color: this.props.color
    }

    this.setState({ history: (<History view={obj} handleClick={this.deleteHistory} />) } );
  }

  deleteHistory() {
    this.setState({history: null});
  }

  render() {

    var chart = null;

    var options = {
      onClick: this.handleClick,
      animation: {
        duration: 200,
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
