import React, { Component } from "react";
import { capitalizeFirstLetter, checkDeadline, getSubmissions } from "../functions";
import * as SubStyle from "../Styles/SubmissionsStyle";
import SubmissionPopup from "./SubmissionPopup";

/**
 *  Submission component
 *  TODO:
 *    - Form, post changes, 
 *    - Styling
 */

class Submission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submissions: getSubmissions(),
      submission: null,
      showPopup: false
    };
  }

  togglePopup(submission) {
    this.setState({
      submission: submission
    });
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    return (
      <div style={SubStyle.bodyDiv}>
        {this.state.submissions.map(submission => {
          return (
            <div style={SubStyle.submissionDiv} key={submission.id}>
              <div style={SubStyle.submissionHeaderStyle}>
                {capitalizeFirstLetter(submission.type)}
                <i
                  className="far fa-edit"
                  style={SubStyle.edit}
                  onClick={() => this.togglePopup(submission)}
                />
              </div>
              <div style={SubStyle.submissionRowStyle}>
                <span style={SubStyle.keyStyle}>Deadline</span>
                <span style={SubStyle.valueStyle}>
                  {checkDeadline(submission.deadline)}{" "}
                </span>
              </div>
              <div style={SubStyle.submissionRowStyle}>
                <span style={SubStyle.keyStyle}>Status</span>
                <span style={SubStyle.valueStyle}>
                  {capitalizeFirstLetter(submission.status)}
                </span>
              </div>
            </div>
          );
        })}
        {this.state.showPopup ? (
          <SubmissionPopup
            submission={this.state.submission}
            closePopup={this.togglePopup.bind(this)}
          />
        ) : null}
      </div>
    );
  }
}


export default Submission;
