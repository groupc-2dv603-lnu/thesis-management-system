import React, { Component } from "react";
import * as Style from "../../Styles/SubmissionBoxStyle";
import * as func from "../studentFunctions/SubmissionBoxFunctions";
import * as PopupStyle from "../../Styles/PopupStyles";
import * as generalFunctions from "../../../../functions";
import * as corFunc from "../../coordinatorFunctions";
import { dbSubmissionTypes } from "../../../../enums";

class ProjectDescriptionBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChangeDeadline: false,
      deadLine: "",
      newDeadlineDate: "",
      newDeadlineTime: "",
      projectDescription: this.props.projectDescription,
      submission: this.props.submission,
      showMessage: false,
      message: "",
      deadlineChanged: false, // bugfix
      gradeChanged: false
    };
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
    this.state.projectDescription.deadLine = deadline;
    this.setState({
      projectDescription: this.state.projectDescription,
      deadlineChanged: true
    });
    this.toggleDeadlineChange();
  }

  setGrade(event) {
    this.state.projectDescription.grade = event.target.value;
    this.setState({
      projectDescription: this.state.projectDescription,
      gradeChanged: true
    });
  }

  async handleSubmit() {
    if (!this.state.deadlineChanged && !this.state.gradeChanged) {
      this.toggleMessage("Nothing to submit");
      return;
    }
    if (this.state.deadlineChanged === true) {
      const validDeadline = corFunc.validDeadline(
        this.state.projectDescription.deadLine
      );
      if (validDeadline !== true) {
        this.toggleMessage("Deadline is not valid");
        return;
      }
    }
    const request = await corFunc.updateSubmission(
      dbSubmissionTypes.projectDescription,
      this.state.projectDescription
    );
    if (request.status === 200) {
      this.toggleMessage("Submission updated successfully");
    } else {
      this.toggleMessage("Update failed");
    }
  }

  render() {
    return (
      <div>
        <div>{this.state.showMessage === true ? this.getMessage() : null}</div>
        <div style={Style.subBoxDiv}>
          {/* ----- SUBMISSION HEADER AND DOWNLOAD ----- */}
          <div style={Style.subBoxHeader}>
            Project Description
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
                {func.getStatus(this.state.projectDescription.deadLine)}
              </span>
            </div>
            {/* ----- DEADLINE ----- */}
            <div style={Style.submissionRow}>
              <span style={Style.submissionLeftColumn}>Deadline</span>
              <span style={Style.submissionRightColumn}>
                {this.state.projectDescription !== null
                  ? func.getDeadline(this.state.projectDescription.deadLine)
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
                {this.state.projectDescription !== null
                  ? func.getGrade(this.state.projectDescription.grade)
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
            {/* ----- SUBMIT ----- */}
            <div onClick={() => this.handleSubmit()} style={Style.submitRow}>
              Submit changes
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectDescriptionBox;
