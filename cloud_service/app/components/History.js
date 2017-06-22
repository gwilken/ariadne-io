import React from "react";
import {Line} from 'react-chartjs-2';

class History extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: []
    }
  }

  componentDidMount() {

    fetch('/datapoint/test/test/5');

      // .then((res) => res.json())
      //   .then(function(objs) {
      //     //console.log(objs);
      //     this.setState( { data: objs} );
      //
      //   }.bind(this));


  }

  componentWillReceiveProps(nextProps) {

    // if(this.state) {
    //   if(nextProps.data) {
    //
    //     var newState = this.state.data.slice();
    //     newState.push(nextProps.data);
    //     newState.shift();
    //
    //     this.setState({data: newState});
    //   }
    // }
  }

  render() {

    var data = {
      labels: [1] ,
      datasets: [
          {
            fill: true,
            backgroundColor: 'royalblue',
            borderWidth: 2,
            lineTension: 0.1,
            pointRadius: 0,
            data: [1]
          }
       ]
    }

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
      animation: {
        // duration: 100,
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


  return (

      <div> <h3>Historical ***TESTING****</h3>
        <div>

          <div>

            <Line data={data}
                options={options}
                width={800}
                height={800}
            />

          </div>

        </div>
      </div>
    )
  }
}
export default History;
