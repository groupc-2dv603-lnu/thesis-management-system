import React, { Component } from 'react';

class InitialReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentId: this.props.studentId 
    };
  }


  render() {
    return (
      <div>Initialll</div>
    )
  }
}
 
export default InitialReport;