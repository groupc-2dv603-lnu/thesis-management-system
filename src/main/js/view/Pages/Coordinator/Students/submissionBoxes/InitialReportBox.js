import React, { Component } from "react";
import * as Style from "../../Styles/SubmissionBoxStyle";
import * as PopupStyle from "../../Styles/PopupStyles";
import * as func from "../studentFunctions/SubmissionBoxFunctions";
import Feedback from "./ShowFeedback";
import * as corFunc from "../../coordinatorFunctions";
import * as generalFunctions from "../../../../functions";
import { dbSubmissionTypes } from "../../../../enums";

class InitialReportBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChangeDeadline: false,
      deadLine: "",
      newDeadlineDate: "",
      newDeadlineTime: "",
      initialReport: this.props.initialReport,
      submission: this.props.submission,
      showMessage: false,
      message: "",
      feedbacks: this.props.feedbacks,
      showFeedback: false
    };
    this.getMessage = this.getMessage.bind(this);
  }

  toggleMessage(message) {
    this.setState({
      message: message,
      showMessage: !this.state.showMessage
    });
    setTimeout(() => {
      this.setState({
        message: "",
        showMessage: !this.state.showMessage
      });
    }, 2000);
  }

  getMessage() {
    return <div style={PopupStyle.message}>{this.state.message}</div>;
  }

  toggleFeedback() {
    this.setState({
      showFeedback: !this.state.showFeedback
    });
  }

  toggleDeadlineChange() {
    this.setState({ showChangeDeadline: !this.state.showChangeDeadline });
  }

  handleDeadlineDate(event) {
    this.setState({ newDeadlineDate: event.target.value });
  }

  handleDeadlineTime(event) {
    this.setState({ newDeadlineTime: event.target.value });
  }

  setDeadline() {
    const deadline = `${this.state.newDeadlineDate}T${
      this.state.newDeadlineTime
    }:00`;

    this.state.initialReport.deadLine = deadline;
    this.setState({ initialReport: this.state.initialReport });
    this.toggleDeadlineChange();
  }

  setGrade(event) {
    this.state.initialReport.grade = event.target.value;
    this.setState({ initialReport: this.state.initialReport });
  }

  async handleSubmit() {
    const validDeadline = corFunc.validDeadline(
      this.state.initialReport.deadLine
    );
    if (validDeadline !== true) {
      this.toggleMessage("Deadline is not valid");
      return;
    }
    const request = await corFunc.updateSubmission(
      dbSubmissionTypes.initialReport,
      this.state.initialReport
    );
    if (request.status === 200) {
      this.toggleMessage("Submission updated successfully");
    } else {
      this.toggleMessage("Update failed");
    }
  }

  render() {
    let i = 0; // key for feedback

    return (
      <div>
        <div>{this.state.showMessage === true ? this.getMessage() : null}</div>
        <div style={Style.subBoxDiv}>
          {/* ----- SUBMISSION HEADER AND DOWNLOAD ----- */}
          <div style={Style.subBoxHeader}>
            Initial Report
            {this.state.submission !== undefined ? (
              <span
                onClick={() =>
                  generalFunctions.downloadFile(this.state.submission.fileUrl)
                }
                style={Style.downloadSpan}
              >
                <i className="fas fa-download" />
              </span>
            ) : null}
          </div>

          {/* ----- STATUS ----- */}
          <div style={Style.submissionBody}>
            <div style={Style.submissionRow}>
              <span style={Style.submissionLeftColumn}>Status</span>
              <span style={Style.submissionRightColumn}>
                {func.getStatus(this.state.initialReport.deadLine)}
              </span>
            </div>
            {/* ----- DEADLINE ----- */}
            <div style={Style.submissionRow}>
              <span style={Style.submissionLeftColumn}>Deadline</span>
              <span style={Style.submissionRightColumn}>
                {this.state.initialReport !== null
                  ? func.getDeadline(this.state.initialReport.deadLine)
                  : "not set"}
              </span>
              <span style={Style.submissionEditColumn}>
                <i
                  onClick={() => this.toggleDeadlineChange()}
                  className="fas fa-edit"
                />
              </span>
            </div>
            {/* ----- CHANGE DEADLINE ----- */}
            {this.state.showChangeDeadline ? (
              <div style={Style.submissionRow}>
                <span style={Style.submissionLeftColumn}>Set deadline</span>
                <span style={Style.submissionInputColumn} />
                <input
                  type="date"
                  value={this.state.newDeadlineDate}
                  onChange={() => this.handleDeadlineDate(event)}
                />
                <input
                  type="time"
                  value={this.state.newDeadlineTime}
                  onChange={() => this.handleDeadlineTime(event)}
                />
                <i
                  className="fas fa-check"
                  style={Style.submissionEditColumn}
                  onClick={() => this.setDeadline()}
                />
              </div>
            ) : null}
            {/* ----- File uploaded ----- */}
            <div style={Style.submissionRow}>
              <span style={Style.submissionLeftColumn}>File uploaded</span>
              <span style={Style.submissionRightColumn}>
                {this.state.submission !== undefined
                  ? func.getDate(this.state.submission.submissionDate)
                  : "No file uploaded"}
              </span>
            </div>
            {/* ----- GRADE ----- */}
            <div style={Style.submissionRow}>
              <span style={Style.submissionLeftColumn}>Grade</span>
              <span style={Style.submissionRightColumn}>
                {this.state.finalReport !== null
                  ? func.getGrade(this.state.initialReport.grade)
                  : "Not set"}
              </span>
              <div>
                {this.state.submission !== undefined ? (
                  <span style={Style.submissionEditColumn}>
                    <select
                      style={Style.select}
                      onChange={() => this.setGrade(event)}
                    >
                      {func.getGrades(1)}
                    </select>
                  </span>
                ) : null}
              </div>
            </div>

            {/* ----- BIDS ----- */}
            <div style={Style.submissionRow}>
              <span style={Style.submissionLeftColumn}>Bids</span>
              <span style={Style.submissionRightColumn}>
                {this.state.initialReport.bids.length}
              </span>
            </div>
            {/* ----- ASSIGNED READERS ----- */}
            <div style={Style.submissionRow}>
              <span style={Style.submissionLeftColumn}>Readers</span>
              <span style={Style.submissionRightColumn}>
                {this.state.initialReport.assignedReaders.length}
              </span>
            </div>
            {/* ----- ASSIGNED OPPONENT ----- */}
            <div style={Style.submissionRow}>
              <span style={Style.submissionLeftColumn}>Opponent</span>
              <span style={Style.submissionRightColumn}>
                {this.state.initialReport.assignedOpponents.length}
              </span>
            </div>
            {/* ----- SUBMIT ----- */}
            <div onClick={() => this.handleSubmit()} style={Style.submitRow}>
              Submit changes
            </div>
          </div>

          {/* ----- FEEDBACK ----- */}
          <div>
            {this.state.feedbacks.length === 0 ||
            this.state.submission === undefined ? (
              <div style={Style.showFeedback}>No feedback provided</div>
            ) : (
              <div
                style={Style.showFeedback}
                onClick={() => this.toggleFeedback()}
              >
                Show feedback
              </div>
            )}
          </div>
        </div>
        <div style={Style.feedbackBody}>
          {this.props.feedbacks !== undefined &&
          this.state.showFeedback !== false
            ? this.props.feedbacks.map(feedback => {
                return <Feedback feedback={feedback} key={i++} />;
              })
            : null}
        </div>
      </div>
    );
  }
}

export default InitialReportBox;
