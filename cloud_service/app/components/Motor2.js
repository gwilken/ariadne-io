import React from "react";
import {Bar} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';
import {HorizontalBar} from 'react-chartjs-2';

class Motor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      color: 'firebrick'
    }
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

    var motorData = this.props.data.filter((elem) => {return elem.displayName === 'Electric Yacht 10kW Motor'});

    if(motorData.length > 0) {
      var bankVoltage = motorData[0].data.filter((elem) => {return elem.sensor === "volts"});


    }
      //
      //
      // var ttd = 'Total Discharge in ' + this.state.ey.ttd + ' Hours';
      // var rpm = this.state.ey.rpm + ' RPM';
      //
      // var rtCurrent = this.state.ey.current + ' Ah';
      // var rtBankVolt = this.state.ey.volts + ' v';

      var batteryGroupData = {
        labels: ['Battery 1', 'Battery 2', 'Battery 3', 'Battery 4'],
        datasets: [{
            backgroundColor: 'firebrick',
            borderColor: 'firebrick',
            borderWidth: 1,
            data: [battery1_volts, battery2_volts, battery3_volts, battery4_volts]
          }]
      };

      var batteryGroupOptions = {
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

  //     var ttdData = {
  //       labels: ["Red", "darker red"],
  //       datasets: [{
  //           label: '',
  //           data: [ this.state.ey.ttd ],
  //           backgroundColor: [
  //               'firebrick',
  //               'rgb(0,0,0)'
  //           ],
  //           borderColor: ['firebrick', 'firebrick'],
  //
  //           borderWidth: 1
  //       }]
  //     };
  //
  //     var ttdOptions = {
  //       rotation: 1 * Math.PI,
  //       circumference: 1 * Math.PI,
  //       tooltips: {
  //         enabled: false,
  //       },
  //       legend: {
  //         display: false,
  //         position: 'top',
  //       },
  //       animation: {
  //         // duration: 100,
  //         easing: 'linear'
  //       },
  //       maintainAspectRatio: false
  //     };
  //
  //     var currentData = {
  //         labels: [this.state.ey.current],
  //         datasets: [
  //             {
  //               labels: '',
  //               data: [this.state.ey.current],
  //               backgroundColor: ['firebrick']
  //             }
  //          ]
  //        };
  //
  //     var currentOptions = {
  //     layout: {
  //       padding: {
  //         left: 15,
  //       },
  //     },
  //     tooltips: {
  //       enabled: false,
  //     },
  //     legend: {
  //       display: false,
  //     },
  //     responsive: true,
  //     maintainAspectRatio: false,
  //     scales: {
  //       yAxes: [{
  //         ticks: {
  //           min: 0,
  //           max: 0,
  //           display: false,
  //         },
  //         barThickness: 120,
  //         display: false,
  //       }],
  //       xAxes: [{
  //         ticks: {
  //           min: 0,
  //           max: 10,
  //         },
  //         gridLines: {
  //           display: false,
  //           drawTicks: true,
  //         },
  //       }]
  //     }
  //   }
  //
    var batteryMotorData = {
        labels: [bankVoltage[0].data],
        datasets: [
            {
              labels: '',
              data: [bankVoltage[0].data],
              backgroundColor: ['firebrick']
            }
         ]
       };

    var batteryMotorOptions = {
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
        barThickness: 120,
        display: false,
      }],
      xAxes: [{
        ticks: {
          min: 46,
          max: 60,
        },
        gridLines: {
          display: false,
          drawTicks: true,
        },
      }]
    }
  }

  //   var rpmData = {
  //     labels: ["Red", "darker red"],
  //     datasets: [{
  //         label: '',
  //         data: [ this.state.ey.rpm, 9 ],
  //         backgroundColor: [
  //             'firebrick',
  //             'rgb(0,0,0)'
  //         ],
  //         borderColor: ['firebrick', 'firebrick'],
  //
  //         borderWidth: 1
  //     }]
  //   };
  //
  //   var rpmOptions = {
  //     rotation: 1 * Math.PI,
  //     circumference: 1 * Math.PI,
  //     tooltips: {
  //       enabled: false,
  //     },
  //     legend: {
  //       display: false,
  //       position: 'top',
  //     },
  //     animation: {
  //       // duration: 100,
  //       easing: 'linear'
  //     },
  //     maintainAspectRatio: false
  //   };

    return (

      <div>

        <h3>Motor</h3>


         {/* <div className="graphContainer">

          <HorizontalBar data={currentData}
            options={currentOptions}
              width={800}
              height={140}
          />

          <div className="titlebar">
            <div className="title">Current Usage</div>
            <div className="rtData"> {rtCurrent} </div>
          </div>

        </div>

          <div className="gaugeContainer">

            <div className="gaugeLeft">
              <Doughnut data={ttdData}
                options={ttdOptions}
                  width={400}
                  height={140}
              />
            </div>

            <div className="gaugeRight">
              <Doughnut data={rpmData}
                options={rpmOptions}
                  width={400}
                  height={140}
              />
            </div>

          </div>


          <div className="motorGauageBar">
             <div className="title">Motor Batts</div>
             <div className="ttdLabel"> {ttd} </div>
            <div className="rpmLabel"> {rpm} </div>
          </div>*/}







        <div className="graphContainer">
            <Bar data={batteryGroupData}
              options={batteryGroupOptions}
                width={800}
                height={280}
            />

          <div className="motorBattBar">
            <div className="motorBattData"> {battery1_volts} </div>
            <div className="motorBattData"> {battery2_volts} </div>
            <div className="motorBattData"> {battery3_volts} </div>
            <div className="motorBattData"> {battery4_volts} </div>
          </div>
        </div>

        <div className="graphContainer">
          <HorizontalBar data={batteryMotorData}
            options={batteryMotorOptions}
              width={800}
              height={140}
          />

          <div className="titlebar">
            <div className="title">Total Bank Voltage</div>
            <div className="rtData"> {bankVoltage[0].data} </div>
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
