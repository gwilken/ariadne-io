import React from "react";

class Test extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: []
    }
  }

  componentDidMount() {
  }

  componentWillReceiveProps() {
  }

  render() {

    console.log(this.props);

    return(
      <div>

        <h1>TEST COMPONENT</h1>

      </div>
    )
   }
 }

export default Test;
