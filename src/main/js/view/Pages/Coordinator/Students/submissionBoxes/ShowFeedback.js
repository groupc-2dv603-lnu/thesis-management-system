import React, { Component } from "react";
import * as Style from "../../Styles/SubmissionBoxStyle";
import * as generalFunctions from '../../../../functions'

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={Style.feedbackBox}>
        <div style={Style.submissionRow}>
          <span style={Style.submissionLeftColumn}>From:</span>
          <span style={Style.submissionRightColumn}>
            {this.props.feedback.name}
          </span>
        </div>
        <div style={Style.submissionRow}>
          <span style={Style.submissionLeftColumn}> Role:</span>
          <span style={Style.submissionRightColumn}>
            {generalFunctions.capitalizeFirstLetter(this.props.feedback.role)}
          </span>
        </div>
        <div style={Style.feedbackText}>{this.props.feedback.text}</div>
      </div>
    );
  }
}

export default Feedback;
