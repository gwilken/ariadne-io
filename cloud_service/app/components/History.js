import React from "react";
import {Line} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';

class History extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      target: this.props.target,
      time: 180
    }
  }

  componentDidMount() {
    fetch(`/telemetry/${this.state.family}/${this.state.time}`)
      .then((res) => res.json())
        .then(function(docs) {
          console.log(docs)
        })
  }

  render() {
    console.log(this.props);

    return(
      <div>

        <h1>history</h1>

      </div>
    )
  }

}

export default History;
