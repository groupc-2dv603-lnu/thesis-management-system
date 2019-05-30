import React, { Component } from "react";
import * as Style from "../Styles/SubmissionBoxStyle";
import * as func from "./studentFunctions/SubmissionBoxFunctions";
import * as studentFunctions from "./studentFunctions/studentFunctions";
/**
 * TODO:
 *  - handleSubmit() update submissions - Need from backend
 *  - add Feedback
 */

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
      // feedback: null
    };

    // console.log("IRBOX", this.state.initialReport);
    this.getMessage = this.getMessage.bind(this);
  }

  setStatus(event) {
    this.state.submission.submissionStatus = event.target.value;
    this.setState({ submission: this.state.submission });
    console.log(
      `submissionStatus set to ${this.state.submission.submissionStatus}`
    );
  }

  toggleMessage(message) {
    this.setState({
      message: message,
      showMessage: !this.state.showMessage
    });
  }

  getMessage() {
    return <div style={Style.message}>{this.state.message}</div>;
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
    console.log(`Deadline set to ${this.state.initialReport.deadLine}`);
    this.toggleDeadlineChange();
  }

  setGrade(event) {
    this.state.initialReport.grade = event.target.value;
    this.setState({ initialReport: this.state.initialReport });
    console.log(`grade set to ${this.state.initialReport.grade}`);
  }

  async handleSubmit() {
    const updateinitialReportUrl =
      "http://localhost:8080/coordinator/updateInitialReport";
    const initialReport = await JSON.stringify(this.state.initialReport);

    const request = await func.updateSubmission(
      updateinitialReportUrl,
      initialReport
    );
    console.log("REQUEST", request);
    if (request.status === 200) {
      this.toggleMessage("Submission updated successfully");
    } else {
      this.toggleMessage("Something went wrong");
    }
  }

  render() {
    return (
      <div>
        {/* ----- ERROR NO SUBMISSION ----- */}
        {this.state.projectDescripton === null ||
        this.state.submission === null ? (
          <div style={Style.noSubFound}>
            No submission found, try reload the page
          </div>
        ) : (
          <div style={Style.subBoxDiv}>
            <div>
              {this.state.showMessage === true ? this.getMessage() : null}
            </div>
            {/* ----- SUBMISSION HEADER AND DOWNLOAD ----- */}
            <div
              style={Style.subBoxHeader}
              onClick={() =>
                func.downloadSubmission(this.state.submission.fileUrl)
              }
            >
              <span style={Style.submissionHeaderName}>
                Initial Report
                <i className="fas fa-download" />
              </span>
            </div>

            {/* ----- STATUS ----- */}
            <div style={Style.submissionBody}>
              <div style={Style.submissionRow}>
                <span style={Style.submissionLeftColumn}>Status</span>
                <span style={Style.submissionRightColumn}>
                  {this.state.submission !== null
                    ? this.state.submission.submissionStatus
                    : "not set"}
                </span>

                {/* ----- CHANGE STATUS ----- */}
                <span style={Style.submissionEditColumn}>
                  <select
                    placeholder="set status"
                    style={Style.select}
                    onChange={() => this.setStatus(event)}
                  >
                    {func.statusOptions(status)}
                  </select>
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
                  {this.state.submission.submissionDate
                    ? func.getDate(this.state.submission.submissionDate)
                    : "No file uploaded"}
                </span>
              </div>
              {/* ----- GRADE ----- */}
              <div style={Style.submissionRow}>
                <span style={Style.submissionLeftColumn}>Grade</span>
                <span style={Style.submissionRightColumn}>
                  {this.state.initialReport !== null
                    ? func.getGrade(this.state.initialReport.grade)
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
                  Fixa OpponentName
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

export default InitialReportBox;
