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
  }

  onFeedbackChange(event) {
    this.state.feedback.text = event.target.value
    this.setState({feedback: this.state.feedback})
    console.log('feedbackText', this.state.feedback.text)
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
    return true;
  }

  hasDeadline() {
    return this.state.thesisPart !== null
      ? this.state.thesisPart.deadline
      : "Not set";
  }

  setDeadline(event) {
    this.state.thesisPart.deadline = event.target.value;
    console.log('deadline changed to', this.state.thesisPart.deadline)
  }

  statusOptions(option) {
    let i = 0;
    return option.map(value => (
      <option value={value} key={i++}>
        {capitalizeFirstLetter(value)}
      </option>
    ));
  }

  setStatus(event) {
    this.state.submission.status = event.target.value;
    console.log("status changed to", this.state.submission.status);
  }

  setGrade(event) {
    this.state.thesisPart.grade = event.target.value;
    console.log("grade changed to", this.state.thesisPart.grade);
  }

  gradeOptions(option) {
    let i = 0;
    return option.map(value => (
      <option value={value} key={i++}>
        {capitalizeFirstLetter(value)}
      </option>
    ));
  }

  render() {
    const grading1 = ["pass", "fail"];
    const grading2 = ["a", "b", "c", "d", "e", "f"];
    const status = ["disabled", "active", "finished"];

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
                  <select
                    placeholder="set status"
                    onChange={() => this.setStatus(event)}
                  >
                    {this.statusOptions(status)}
                  </select>
                </span>
              </div>
              <div style={Style.submissionRow}>
                <span style={Style.submissionLeftColumn}>Deadline</span>
                <span style={Style.submissionRightColumn}>
                  {this.hasDeadline()}
                </span>
                <span style={Style.submissionEditColumn}>
                  <input
                    type="text"
                    placeholder="change deadline"
                    onChange={() => this.setDeadline(event)}
                  />
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
                <span style={Style.submissionRightColumn}>
                  {capitalizeFirstLetter(this.state.thesisPart.grade)}
                </span>
                <span style={Style.submissionEditColumn}>
                  <select
                    placeholder="set grade"
                    onChange={() => this.setGrade(event)}
                  >
                    {this.state.submission.type === "project description" ||
                    this.state.submission.type === "project plan"
                      ? this.gradeOptions(grading1)
                      : this.gradeOptions(grading2)}
                  </select>
                </span>
              </div>
              {this.hasFeedback() === true ? (
                <Feedback 
                feedback={this.state.feedback}
                onFeedbackChange={() => this.onFeedbackChange(event)}
                 />
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
