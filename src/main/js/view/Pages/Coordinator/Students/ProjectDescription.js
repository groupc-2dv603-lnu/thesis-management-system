/**
 * TODO:
 *  - handleSubmits ()
 *
 * */ import React, { Component } from "react";
import { getProjectDescription, getFeedback } from "../functions";
import * as Style from "../Styles";
import Feedback from "./Feedback";

class ProjectDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentId: null,
      description: null,
      feedback: {}
    };
    this.state.description = getProjectDescription(this.props.userId);
    this.state.feedback = getFeedback(this.state.description.submissionId);
    console.log(this.state.description.submissionId)
  }

  handleChangeFeedback(event) {
    this.state.feedback.text = event.target.value;
    this.setState({ feedback: this.state.feedback });
  }

  handleChangeDeadline(event) {
    this.state.description.deadline = event.target.value;
  }

  handleChangeGrade(event) {
    this.state.description.grade = event.target.value;
    this.setState({ description: this.state.description });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Project description to submit', this.state.description);
    console.log('feedback to submit', this.state.feedback)
  }

  render() {
    return (
      <div style={Style.submissionDivStyle}>
        {this.state.description !== null ? (
          <div style={Style.formDiv}>
            <button style={Style.downloadSubmission}>
              Download Submission
            </button>
            <form onSubmit={() => this.handleSubmit(event)}>
              <div style={Style.popupRow}>
                <label style={Style.label}>Deadline:</label>
                <input
                  onChange={() => this.handleChangeDeadline(event)}
                  type="text"
                  name="deadline"
                  placeholder={this.state.description.deadline}
                  style={Style.input}
                />
              </div>
              <div style={Style.popupRow}>
                <label style={Style.label}>Grade:</label>
                <select
                  onChange={() => this.handleChangeGrade(event)}
                  style={Style.select}
                  value={this.state.description.grade}
                >
                  <option value="notSet">Not set</option>
                  <option value="pass">Pass</option>
                  <option value="fail">Fail</option>
                </select>
              </div>
              <Feedback
                feedback={this.state.feedback}
                handleChangeFeedback={() =>
                  this.handleChangeFeedback(event)
                }
              />
              <input type="submit" style={Style.submitButton} />
            </form>
          </div>
        ) : (
          "No description found"
        )}
      </div>
    );
  }
}

export default ProjectDescription;
