import React, { Component } from "react";
import {
  getSubmission,
  capitalizeFirstLetter,
  getThesis,
  getFeedback
} from "../functions";
import * as Style from "../Styles";
import Feedback from "./Feedback";

class SubmissionBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submission: null,
      thesisPart: null,
      feedback: null
    };

    this.state.submission = getSubmission(this.props.userId, this.props.type);
    this.state.thesisPart = getThesis(
      this.state.submission.id,
      this.props.type
    );
    this.state.feedback = getFeedback(this.state.submission.id);
    console.log("state subBox", this.state);
    console.log("props subBox", this.props);
  }

  downloadSubmission() {
    console.log("submission downloaded");
  }

  hasFeedback() {
    return true;
  }

  submitChanges() {
    console.log("update changes");
  }

  hasDeadline() {
    return true
  }

  showDeadline() {
    return this.state.thesisPart !== null ? this.state.thesisPart.deadline : 'Not set'
  }

  setStatus(event) {
    this.state.submission.status = event.target.value
    this.setState({submission: this.state.submission})
  }
  render() {
    return (
      <div>
        {this.props.submission !== null ? (
          <div style={Style.submissionDiv}>
            <div
              style={Style.submissionHeader}
              onClick={() => this.downloadSubmission()}
            >
              <span style={Style.submissionHeaderName}>
                {capitalizeFirstLetter(this.state.submission.type)} submission{" "}
                <i className="fas fa-download" />
              </span>
            </div>
            <div style={Style.submissionBody}>
              <div style={Style.submissionRow}>
                <span style={Style.submissionLeftColumn}>Status</span>
                <span style={Style.submissionRightColumn}>
                  {capitalizeFirstLetter(this.state.submission.status)}
                </span>
                <span style={Style.submissionEditColumn}>
                  <select onChange={() => this.setStatus(event)}>
                    <option value="disabled">Disabled</option>
                    <option value="active">Active</option>
                    <option value="finished">Finished</option>
                  </select>
                </span>
              </div>
              <div style={Style.submissionRow}>
                <span style={Style.submissionLeftColumn}>Deadline</span>
                <span style={Style.submissionRightColumn}>
                  {this.showDeadline()}
                </span>
              </div>
              <div style={Style.submissionRow}>
                <span style={Style.submissionLeftColumn}>Submitted</span>
                <span style={Style.submissionRightColumn}>
                  {this.state.submission.submissionDate}
                </span>
              </div>
              <div style={Style.submissionRow}>
                <span style={Style.submissionLeftColumn}>Grade</span>
                <span style={Style.submissionRightColumn}>pass</span>
              </div>
              {this.hasFeedback() === true ? (
                <Feedback feedback={this.state.feedback} />
              ) : (
                <div style={Style.submissionRow}>
                  <span style={Style.submissionLeftColumn}>Feedback</span>
                  <span style={Style.submissionRightColumn}>
                    No feedback provided
                  </span>
                </div>
              )}
              <div style={Style.submissionRow}>
                <button
                  style={Style.submitButton}
                  onClick={() => this.submitChanges()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>No submission</div>
        )}
      </div>
    );
  }
}

export default SubmissionBox;
