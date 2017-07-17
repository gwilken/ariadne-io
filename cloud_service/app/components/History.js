import React from "react";
import {Line} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';

class History extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      family: this.props.view.family,
      target: this.props.view.displayName,
      color: this.props.view.color,
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
    return(
      <div>

        {this.state}

      </div>
    );
  }

}

export default History;
