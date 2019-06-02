import React, { Component } from "react";
import * as Style from "../../Styles/SubmissionBoxStyle";
import * as func from "../studentFunctions/SubmissionBoxFunctions";
import * as PopupStyle from "../../Styles/PopupStyles";
import * as corFunc from "../../coordinatorFunctions";
import * as generalFunctions from "../../../../functions";
import { dbSubmissionTypes } from '../../../../enums'

class ProjectPlanBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChangeDeadline: false,
      deadLine: "",
      newDeadlineDate: "",
      newDeadlineTime: "",
      projectPlan: this.props.projectPlan,
      submission: this.props.submission,
      showMessage: false,
      message: ""
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

    this.state.projectPlan.deadLine = deadline;
    this.setState({ projectPlan: this.state.projectPlan });
    this.toggleDeadlineChange();
  }

  setGrade(event) {
    this.state.projectPlan.grade = event.target.value;
    this.setState({ projectPlan: this.state.projectPlan });
  }

  async handleSubmit() {
    const validDeadline = corFunc.validDeadline(
      this.state.projectPlan.deadLine
    );
    if (validDeadline !== true) {
      this.toggleMessage("Deadline is not valid");
      return;
    }
    const request = await corFunc.updateSubmission(
      dbSubmissionTypes.projectPlan,
      this.state.projectPlan
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
        {/* ----- ERROR NO SUBMISSION ----- */}
        {this.props.projectPlan === undefined ||
        this.props.submission === undefined ? (
          <div style={Style.noSubFound}>
            No submission found
          </div>
        ) : (
          <div style={Style.subBoxDiv}>
            <div>
              {this.state.showMessage === true ? this.getMessage() : null}
            </div>
            {/* ----- SUBMISSION HEADER AND DOWNLOAD ----- */}
            <div style={Style.subBoxHeader}>
              Project Plan
              {this.state.submission.fileUrl !== "" ? (
                <span
                  style={Style.downloadSpan}
                  onClick={() =>
                    generalFunctions.downloadFile(this.state.submission.fileUrl)
                  }
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
                  {func.getStatus(this.state.projectPlan.deadLine)}
                </span>
              </div>
              {/* ----- DEADLINE ----- */}
              <div style={Style.submissionRow}>
                <span style={Style.submissionLeftColumn}>Deadline</span>
                <span style={Style.submissionRightColumn}>
                  {this.state.projectPlan !== null
                    ? func.getDeadline(this.state.projectPlan.deadLine)
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
                  {this.state.submission.submissionDate
                    ? func.getDate(this.state.submission.submissionDate)
                    : "No file uploaded"}
                </span>
              </div>
              {/* ----- GRADE ----- */}
              <div style={Style.submissionRow}>
                <span style={Style.submissionLeftColumn}>Grade</span>
                <span style={Style.submissionRightColumn}>
                  {this.state.projectPlan !== null
                    ? func.getGrade(this.state.projectPlan.grade)
                    : "Not set"}
                </span>
                <span style={Style.submissionEditColumn}>
                  <select
                    style={Style.select}
                    placeholder="set status"
                    onChange={() => this.setGrade(event)}
                  >
                    {func.getGrades(1)}
                  </select>
                </span>
              </div>
              {/* ----- APPROVED BY SUPERVISOR ----- */}
              <div style={Style.submissionRow}>
                <span style={Style.submissionLeftColumn}>Approved</span>
                <span style={Style.submissionRightColumn}>
                  {this.state.projectPlan.approved === true
                    ? `Plan is approved by a supervisor`
                    : `Plan is not approved by a supervisor`}
                </span>
              </div>
              {/* ----- SUBMIT ----- */}
              <div onClick={() => this.handleSubmit()} style={Style.submitRow}>
                Submit changes
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ProjectPlanBox;
