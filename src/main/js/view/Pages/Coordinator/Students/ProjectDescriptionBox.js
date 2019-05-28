import React, { Component } from "react";
import * as Style from "../Styles/SubmissionBoxStyle";
import * as func from "./studentFunctions/SubmissionBoxFunctions";


/**
 * TODO:
 *  - handleSubmit() update submissions - Need from backend
 */

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
      message: ""
    };

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

    this.state.projectDescription.deadLine = deadline;
    this.setState({ projectDescription: this.state.projectDescription });
    console.log(`Deadline set to ${this.state.projectDescription.deadLine}`);
    this.toggleDeadlineChange();
  }

  setGrade(event) {
    this.state.projectDescription.grade = event.target.value;
    this.setState({ projectDescription: this.state.projectDescription });
    console.log(`grade set to ${this.state.projectDescription.grade}`);
  }

  async handleSubmit() {
    const updateProjectDescriptionUrl =  "http://localhost:8080/coordinator/updateProjectDescription"
    const projectDescription = await JSON.stringify(this.state.projectDescription)

    const request = await func.updateSubmission(updateProjectDescriptionUrl, projectDescription)
    console.log('REQUEST', request)
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
                Project Description
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
                  {this.state.submission.submissionDate
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

export default ProjectDescriptionBox;
