import React from "react";
import {Bar} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';


class Motor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ey: {
        ttd: 0,
        current: 0,
        volts: 0,
        rpm: 0,
        soc: 0
      },
      batt1: {
          busvoltage: 0
      },
      batt2:  {
          busvoltage: 0
      },
      batt3:  {
          busvoltage: 0
      },
      batt4:  {
          busvoltage: 0
      }
    }
  }

  componentWillMount() {
    // var obj = {};
    // var data = {
    //   busvoltage: 0
    // }
    //
    // this.setState( { motor: Object.assign( {}, this.state.motor, { batt1: data } ) } );
    // this.setState( { motor: Object.assign( {}, this.state.motor, { batt2: data } ) } );
    // this.setState( { motor: Object.assign( {}, this.state.motor, { batt3: data } ) } );
    // this.setState( { motor: Object.assign( {}, this.state.motor, { batt4: data } ) } );
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data.ey) {
      if(nextProps.data.ey.ttd) {
        var obj = {};
        this.setState( { ey: Object.assign( {}, this.state.ey, {ttd: nextProps.data.ey.ttd} ) } );
      }
    }

    if(nextProps.data.ey) {
      if(nextProps.data.ey.rpm) {
        var obj = {};
        this.setState( { ey: Object.assign( {}, this.state.ey, {ttd: nextProps.data.ey.rpm} ) } );
      }
    }

    if(nextProps.data.batt1) {
      this.setState( { batt1: nextProps.data.batt1 } );
    }
    if(nextProps.data.batt2) {
      this.setState( { batt2: nextProps.data.batt2 } );
    }
    if(nextProps.data.batt3) {
      this.setState( { batt3: nextProps.data.batt3 } );
    }
    if(nextProps.data.batt4) {
      this.setState( { batt4: nextProps.data.batt4 } );
    }
  }


  render() {

      var rtBatt1 = this.state.batt1.busvoltage.toFixed(2) + ' v';
      var rtBatt2 = this.state.batt2.busvoltage.toFixed(2) + ' v';
      var rtBatt3 = this.state.batt3.busvoltage.toFixed(2) + ' v';
      var rtBatt4 = this.state.batt4.busvoltage.toFixed(2) + ' v';

      var data = {
        labels: ['Battery 1', 'Battery 2', 'Battery 3', 'Battery 4'],
        datasets: [
          {
            backgroundColor: 'firebrick',
            borderColor: 'firebrick',
            borderWidth: 1,
            // hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            // hoverBorderColor: 'rgba(255,99,132,1)',
            data: [this.state.batt1.busvoltage, this.state.batt2.busvoltage, this.state.batt3.busvoltage, this.state.batt4.busvoltage]
          }
        ]
      };

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
      var ttdData = {
        labels: ["Red", "darker red"],
        datasets: [{
            label: '',
            data: [ this.state.ey.ttd, 0 ],
            backgroundColor: [
                'firebrick',
                'rgb(0,0,0)'
            ],
            borderColor: ['firebrick', 'firebrick'],

            borderWidth: 1
        }]
      };

      var ttdOptions = {
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
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
        maintainAspectRatio: false
      };

    var rpmData = {
      labels: ["Red", "darker red"],
      datasets: [{
          label: '',
          data: [ this.state.ey.rpm, 9 ],
          backgroundColor: [
              'firebrick',
              'rgb(0,0,0)'
          ],
          borderColor: ['firebrick', 'firebrick'],

          borderWidth: 1
      }]
    };

    var rpmOptions = {
      rotation: 1 * Math.PI,
      circumference: 1 * Math.PI,
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
      maintainAspectRatio: false
    };

    return (

      <div>

        <h3>Motor</h3>

        <div>
          <div className="gaugeContainer">

            <div className="gaugeLeft">
              <Doughnut data={ttdData}
                options={ttdOptions}
                  width={800}
                  height={140}
              />
            </div>

            <div className="gaugeRight">
              <Doughnut data={rpmData}
                options={rpmOptions}
                  width={800}
                  height={140}
              />
            </div>

          </div>
        </div>

          <div className="graphContainer">

            <Bar data={data}
              options={options}
                width={800}
                height={140}
            />

          <div className="motorBattBar">
            {/* <div className="title">Motor Batts</div> */}
            <div className="motorBattData"> {rtBatt1} </div>
            <div className="motorBattData"> {rtBatt2} </div>
            <div className="motorBattData"> {rtBatt3} </div>
            <div className="motorBattData"> {rtBatt4} </div>
          </div>

        </div>


          {/* <div className="graphContainer">
            <Line data={voltGraphData}
                options={voltChartOptions}
                width={800}
                height={140}
            />

            <div className="titlebar">
              <div className="title"> Volts</div>
              <div className="rtData"> {this.props.data.loadvoltage} V </div>
            </div>
          </div> */}


      </div>
      )

  }
}

export default Motor;
