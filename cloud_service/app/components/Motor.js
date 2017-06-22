import React from "react";
import {Bar} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';


class Motor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ey: null,
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

    var content = ( <div> *** TEST *** </div> );

    //
    // if(this.state.batt1 && this.state.batt2 && this.state.batt3 && this.state.batt4 ) {
    //     console.log('1', this.state.batt1.busvoltage);
    //     console.log('2', this.state.batt2.busvoltage);
    //     console.log('3', this.state.batt3.busvoltage);
    //     console.log('4', this.state.batt4.busvoltage);
    // }



    if(this.state.batt1) {

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

      var doughnutData = {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      };

    var doughnutOptions = {
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

    content = (

      <div>

        <h3>Motor</h3>

        <div>

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


        <div className="graphContainer">
          <Doughnut data={doughnutData}
            options={doughnutOptions}
              width={800}
              height={140}
          />
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
      </div>
      )
    }

    return content;
  }
}

export default Motor;
