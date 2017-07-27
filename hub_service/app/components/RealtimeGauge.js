import React from "react";
import {Doughnut} from 'react-chartjs-2';

class RealtimeGauge extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var data = {
      labels: [this.props.color, this.props.color],
      datasets: [{
          label: '',
          data: [ this.props.data, 9 ],
          backgroundColor: [
              'firebrick',
              'rgb(0,0,0)'
          ],
          borderColor: [this.props.color, this.props.color],
          borderWidth: 1
      }]
    };

    var options = {
      onClick: this.props.handleClick,
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
      maintainAspectRatio: false
    };

    return(

      <div>
        <Doughnut data={data}
          options={options}
            width={400}
            height={280}
        />

        <div className="rpm-label-container">
          <div className="rpm-label-data">{this.props.data}</div>
          <div className="rpm-label">{this.props.displayName}</div>
        </div>
      </div>

    )
  }
}

export default RealtimeGauge;
