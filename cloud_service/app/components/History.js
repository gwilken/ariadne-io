import React from "react";
import {Line} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';

class History extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      family: this.props.view.family,
      displayName: this.props.view.displayName,
      color: this.props.view.color,
      time: 30,
      docs: []
    }
  }

  componentDidMount() {
    fetch(`/telemetry/${this.state.family}/${this.state.displayName}/${this.state.time}`)
      .then((res) => res.json())
        .then((docs) => {
          this.setState({docs: docs});
        }).bind(this);
  };

  render() {
    console.log('state:',this.state);

    return(
      <div>

        <h1>history</h1>

      </div>
    )
  }

}

export default History;
