import React, { Component } from "react";
import * as generalFunctions from "../../../functions";
import * as Style from "../Styles/Styles";
import * as corFunc from "../coordinatorFunctions";

class SubmissionDeadlines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submissionType: "cs", //Initial, = choose submission
      newDeadlineDate: "",
      newDeadlineTime: "",
      showMessage: false,
      message: ""
    };

    this.resetMessage = this.resetMessage.bind(this);
  }

  toggleMessage(message) {
    this.setState({
      message: message,
      showMessage: !this.state.showMessage
    });
  }

  handleDeadlineDate(event) {
    this.setState({ newDeadlineDate: event.target.value });
  }

  handleDeadlineTime(event) {
    this.setState({ newDeadlineTime: event.target.value });
  }

  handleSubmissionChange(event) {
    this.setState({ submissionType: event.target.value });
  }

  resetMessage() {
    setTimeout(() => {
      this.toggleMessage("");
    }, 2000);
  }

  async handleSubmit() {
    if (this.state.submission === "cs") {
      this.toggleMessage("You must choose a submission");
      this.resetMessage();
      return;
    }

    const deadline = `${this.state.newDeadlineDate}T${
      this.state.newDeadlineTime
    }:00`;

    if (corFunc.validDeadline(deadline) === false) {
      this.toggleMessage("Date is not valid");
      this.resetMessage();
      return;
    }
    this.toggleMessage('Loading...')

    const response = await corFunc.setDeadlineForAll(
      this.state.submissionType,
      deadline
    );
    if(response === true) {
      this.toggleMessage('')
      this.toggleMessage('Updated successfully')
      this.resetMessage()
    } else {
      this.toggleMessage('')
      this.toggleMessage('Something went wrong')
      this.resetMessage()
    }
  }

  render() {
    const submissions = [
      {
        name: "Choose submission",
        value: "cs"
      },
      {
        name: "Project Descriptions",
        value: "PRJ_DESCRIPTION"
      },
      {
        name: "Project Plans",
        value: "PRJ_PLAN"
      },
      {
        name: "Initial Reports",
        value: "INITIAL_REPORT"
      },
      {
        name: "Final Reports",
        value: "FINAL_REPORT"
      }
    ];

    let i = 0;

    return (
      <div>
        <div style={Style.dropDownBody}>
          <div style={Style.deadlineRow}>
            <div style={Style.deadlineRowLeft}>Set deadline for all </div>
            <div style={Style.deadlineRowRight}>
              <select onChange={() => this.handleSubmissionChange(event)}>
                {submissions.map(object => {
                  return (
                    <option value={object.value} key={i++}>
                      {object.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div style={Style.deadlineRow}>
            <div style={Style.deadlineRowLeft}>Date and time</div>
            <div style={Style.deadlineRowRight}>
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
            </div>
          </div>
          <div style={Style.submitRow} onClick={() => this.handleSubmit()}>
            Submit
          </div>
          {this.state.showMessage === true ? (
            <div style={Style.submitRow}>{this.state.message}</div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default SubmissionDeadlines;
