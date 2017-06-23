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

          <Line data={this.props.data.datasets}
              options={this.props.data.options}
              width={800}
              height={800}
          />

        </div>
      )
    }
}

export default HistoryGraph;
