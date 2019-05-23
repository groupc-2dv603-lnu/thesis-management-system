import React, { Component } from "react";
import { capitalizeFirstLetter, checkDeadline, getSubmissions } from "../functions";
import * as Style from "../Styles";
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
      <div style={Style.bodyDiv}>
        {this.state.submissions.map(submission => {
          return (
            <div style={Style.submissionDiv} key={submission.id}>
              <div style={Style.submissionHeaderStyle}>
                {capitalizeFirstLetter(submission.type)}
                <i
                  className="far fa-edit"
                  style={Style.edit}
                  onClick={() => this.togglePopup(submission)}
                />
              </div>
              <div style={Style.submissionRowStyle}>
                <span style={Style.keyStyle}>Deadline</span>
                <span style={Style.valueStyle}>
                  {checkDeadline(submission.deadline)}{" "}
                </span>
              </div>
              <div style={Style.submissionRowStyle}>
                <span style={Style.keyStyle}>Status</span>
                <span style={Style.valueStyle}>
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
