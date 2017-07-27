import React from "react";
import {Bar} from 'react-chartjs-2';

class BatteryBank extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var battery1 = this.props.data.filter((elem) => {return elem.displayName === 'Battery 1'});
    var battery2 = this.props.data.filter((elem) => {return elem.displayName === 'Battery 2'});
    var battery3 = this.props.data.filter((elem) => {return elem.displayName === 'Battery 3'});
    var battery4 = this.props.data.filter((elem) => {return elem.displayName === 'Battery 4'});

    if(battery1.length > 0) var battery1_volts = battery1[0].data[0].data.toFixed(2);
    if(battery2.length > 0) var battery2_volts = battery2[0].data[0].data.toFixed(2);
    if(battery3.length > 0) var battery3_volts = battery3[0].data[0].data.toFixed(2);
    if(battery4.length > 0) var battery4_volts = battery4[0].data[0].data.toFixed(2);


    var data = {
      labels: ['Battery 1', 'Battery 2', 'Battery 3', 'Battery 4'],
      datasets: [{
          backgroundColor: this.props.color,
          borderColor: this.props.color,
          borderWidth: 1,
          data: [battery1_volts, battery2_volts, battery3_volts, battery4_volts]
        }]
    };

    var options = {
      tooltips: {
        enabled: false,
      },
      legend: {
        display: false,
        position: 'top',
      },
      animation: {
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
          display: true,
          gridLines: {
            display: false,
            drawTicks: false,
          },
          scaleLabel: {
            display: true,
          }
        }
        ]
      }
    }

    return(
      <div className="graphContainer">
          <Bar data={data}
            options={options}
              width={800}
              height={280}
          />

        <div className="motorBattBar">
          <div className="motorBattData"> {battery1_volts} V</div>
          <div className="motorBattData"> {battery2_volts} V</div>
          <div className="motorBattData"> {battery3_volts} V</div>
          <div className="motorBattData"> {battery4_volts} V</div>
        </div>
      </div>
    );

  }

}

export default BatteryBank;
