import React, { Component } from "react";
import * as Style from "../Styles/SubmissionBoxStyle";
import * as PopupStyle from "../Styles/PopupStyles";
import * as func from "../func";
import * as boxFunctions from "./SubmissionBoxFunctions";

class ProjectDescriptionBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChangeDeadline: false,
      deadLine: "",
      newDeadlineDate: "",
      newDeadlineTime: ""
    };

    console.log("DescBoxProps", this.props);
  }

  setStatus(event) {
    console.log("status is not defined, need GET submission/(id)");
  }

  toggleDeadlineChange() {
    this.setState({ showChangeDeadline: !this.state.showChangeDeadline });
    console.log("BOXSTATE", this.state.showChangeDeadline);
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
    console.log("DEADLINE", deadline);
    this.setState({ deadLine: deadline });
    this.toggleDeadlineChange();
  }

  render() {
    return (
      <div>
        {/* ----- ERROR NO SUBMISSION ----- */}
        {this.props.submission === null ? (
          <div style={Style.noSubmission}>Submission not found</div>
        ) : (
          <div style={Style.subBoxDiv}>
            {/* ----- SUBMISSION HEADER AND DOWNLOAD ----- */}
            <div
              style={Style.subBoxHeader}
              onClick={() => boxFunctions.downloadSubmission()}
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
                  Need GET submission/(id)
                </span>
                <span style={Style.submissionEditColumn}>
                  <select
                    placeholder="set status"
                    style={Style.select}
                    onChange={() => this.setStatus(event)}
                  >
                    {boxFunctions.statusOptions(status)}
                  </select>
                </span>
              </div>
              {/* ----- DEADLINE ----- */}
              <div style={Style.submissionRow}>
                <span style={Style.submissionLeftColumn}>Deadline</span>
                <span style={Style.submissionRightColumn}>
                  {this.state.deadline !== ""
                    ? boxFunctions.getDeadline(this.state.deadLine)
                    : boxFunctions.getDeadline(this.props.submission.deadLine)}
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
              {/* ----- Handed in ----- */}
              <div style={Style.submissionRow}>
                <span style={Style.submissionLeftColumn}>Handed in</span>
                <span style={Style.submissionRightColumn}>
                  Needs GET submissions
                </span>
              </div>
              {/* ----- GRADE ----- */}
              <div style={Style.submissionRow}>
                <span style={Style.submissionLeftColumn}>Grade</span>
                <span style={Style.submissionRightColumn}>{this.props.submission.grade === 'NOGRADE' ? 'Not set' : this.props.submission.grade}</span>
                <span style={Style.submissionEditColumn}>
                  <select
                    style={Style.select}
                    placeholder="set status"
                    onChange={() => this.setStatus(event)}
                  >
                    {boxFunctions.getGrades(1)}
                  </select>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ProjectDescriptionBox;
