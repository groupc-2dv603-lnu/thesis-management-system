import React, { Component } from "react";
import { getName, capitalizeFirstLetter } from "../functions";
import * as Style from "../Styles/SubmissionBoxStyle";

class Feedback extends Component {
  render() {
    console.log("feedbackprops", this.props);
    return (
      <div>
        <div style={Style.submissionFeedbackRow}>
          <span style={Style.submissionLeftColumn}>Feedback</span>
          <span style={Style.submissionRightColumn}>
            <textarea
              style={Style.textarea}
              onChange={() => this.props.onFeedbackChange(event)}
              value="hardcoded text"
            />
          </span>
        </div>
        {this.props.feedback !== null ? (
          <div style={Style.submissionFeedbackFromRow}>
            <span style={Style.submissionLeftColumn}>From</span>
            <span style={Style.submissionRightColumn}>
              role: coordinator name: martin
            </span>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Feedback;
