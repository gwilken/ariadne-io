import React from "react";
import {Line} from 'react-chartjs-2';

class HistoryGraph extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    console.log(this.props.datasets);

    return (
        <div className="historyGraph">

          <Line data={this.props.datasets.datasets}
              options={this.props.datasets.options}
              width={800}
              height={800}
          />

        </div>
      )
    }
}

export default HistoryGraph;
