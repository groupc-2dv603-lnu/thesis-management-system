import React, { Component } from "react";
import * as Style from "../../Styles/SubmissionBoxStyle";

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <div style={Style.feedbackBox}>
        <div style={Style.feedbackHeader}>
          Feedback from: {/*add role */} {this.props.feedback.name}
        </div>
        <div style={Style.feedbackText}>
          {this.props.feedback.text}
        </div>
      </div>
      );
  }
}

export default Feedback;
