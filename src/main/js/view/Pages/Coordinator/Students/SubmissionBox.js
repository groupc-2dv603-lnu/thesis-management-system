import React, { Component } from "react";
import {
  getSubmission,
  capitalizeFirstLetter,
  getThesis,
  getFeedback
} from "../functions";
import * as Style from "../Styles/SubmissionBoxStyle";
import * as PopupStyle from "../Styles/PopupStyles";
import * as func from "../func";

import Feedback from "./Feedback";

class SubmissionBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: null
    };

  }

  onFeedbackChange(event) {
    this.state.feedback.text = event.target.value;
    this.setState({ feedback: this.state.feedback });
    console.log("feedbackText", this.state.feedback.text);
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

  setDeadline(event) {
    this.state.thesisPart.deadline = event.target.value;
    console.log("deadline changed to", this.state.thesisPart.deadline);
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

  getGrade() {
    return this.props.submission.grade !== ""
      ? this.props.submission.grade
      : "Grade not set";
  }

  setGrade(event) {
    this.props.submission.grade = event.target.value;
    console.log("grade changed to", this.props.submission.grade);
  }

  gradeOptions(option) {
    let i = 0;
    return option.map(value => (
      <option value={value} key={i++}>
        {value}
      </option>
    ));
  }

  handleSubmit() {}

  initialReport() {
    if (this.props.submission.type === "initialReport") {
      return (
        <div style={Style.submissionRow}>
          <span style={Style.submissionLeftColumn}>Bids</span>
          <span style={Style.submissionRightColumn}>
            {this.props.submission.bids}
          </span>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const grading1 = ["PASS", "FAIL"];
    const grading2 = ["A", "B", "C", "D", "E", "F"];
    const status = ["disabled", "active", "finished"];

    return (
      <div>
        {this.props.submission !== null ? (
          <div style={Style.subBoxDiv}>
            <div
              style={Style.subBoxHeader}
              onClick={() => this.downloadSubmission()}
            >
              <span style={Style.submissionHeaderName}>
                {this.props.type}
                <i className="fas fa-download" />
              </span>
            </div>
            <div style={Style.submissionBody}>
              <div style={Style.submissionRow}>
                <span style={Style.submissionLeftColumn}>Status</span>
                <span style={Style.submissionRightColumn}>
                  Hardcoded deadline
                  {/*func.capitalizeFirstLetter(this.state.submission.status)*/}
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
                <span style={Style.submissionRightColumn}>27-05-2019</span>
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
                  Hardcoded submissiondate
                  {/*this.state.submission.submissionDate*/}
                </span>
              </div>
              <div style={Style.submissionRow}>
                <span style={Style.submissionLeftColumn}>Grade</span>
                <span style={Style.submissionRightColumn}>
                  {this.getGrade()}
                </span>
                <span style={Style.submissionEditColumn}>
                  <select
                    placeholder="set grade"
                    onChange={() => this.setGrade(event)}
                  >
                    {this.props.type === "projectDescription" ||
                    this.props.type === "projectPlan"
                      ? this.gradeOptions(grading1)
                      : this.gradeOptions(grading2)}
                  </select>
                </span>
              </div>
              {this.props.submission.type === "initialReport" ? (
                <div style={Style.submissionRow}>
                  <span style={Style.submissionLeftColumn}>Bids</span>
                  <span style={Style.submissionRightColumn}>
                    {this.props.submission.bids}
                  </span>
                </div>
              ) : null}
              <div>{this.initialReport()}</div>
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
                  style={PopupStyle.submitButton}
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
