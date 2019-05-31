import React, { Component } from "react";
import * as generalFunctions from "../../../functions";
import * as Style from '../Styles/Styles'
import * as corFunc from '../coordinatorFunctions'

class SubmissionDeadlines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submission: "cs", //Initial, = choose submission
      newDeadlineDate: "",
      newDeadlineTime: "",
      showMessage: false,
      message: ""
    };

    this.resetMessage = this.resetMessage.bind(this)
  }

  toggleMessage(message) {
    this.setState({
      message: message,
      showMessage: !this.state.showMessage
    });
  }

  handleDeadlineDate(event) {
    this.setState({ newDeadlineDate: event.target.value });
    console.log(this.state);
  }

  handleDeadlineTime(event) {
    this.setState({ newDeadlineTime: event.target.value });
    console.log(this.state);
  }

  handleSubmissionChange(event) {
    this.setState({ submission: event.target.value });
    console.log(this.state);
  }
  
  resetMessage(){
    setTimeout(() => {
      this.toggleMessage('')
    }, 2000)
  }

  async handleSubmit() {
    if(this.state.submission === "cs" ) {
      this.toggleMessage('You must choose a submission')
      this.resetMessage()
      return
    }
    const deadline = `${this.state.newDeadlineDate}T${
      this.state.newDeadlineTime
    }:00`;

    console.log('DEADLINE', deadline)
    console.log('LENGTh', deadline.length)

    if (corFunc.validDeadline(deadline) === false) {
      this.toggleMessage('Date is not valid')
      this.resetMessage()
      return
    }

    this.toggleMessage("Loading");

    const students = await generalFunctions.getFromAPI(
      "/coordinator/getAllStudents"
    );
    for (const student of students.entity) {
      let submissions = await generalFunctions.getFromAPI(
        `/coordinator/getAllSubmissionsByUserID?userId=${student.userId}`
      );
      console.log(submissions);
      if (this.state.submission === "pd") {
        let submission = submissions.entity.projectDescriptions[0];
        submission.deadLine = deadline;
        const request = await corFunc.updateSubmission(
          "pd",
          submission
        );
      } else if (this.state.submission === "pp") {
        let submission = submissions.entity.projectPlans[0];
        submission.deadLine = deadline;
        const request = await corFunc.updateSubmission(
          "pp",
          submission
        );
      } else if (this.state.submission === "ir") {
        let submission = submissions.entity.initialReports[0];
        submission.deadLine = deadline;
        const request = await corFunc.updateSubmission(
          "ir",
          submission
        );
      } else if (this.state.submission === "fr") {
        let submission = submissions.entity.finalReports[0];
        submission.deadLine = deadline;
        const request = await corFunc.updateSubmission(
          "fr",
          submission
        );
      }
    }
    this.toggleMessage("");
    this.toggleMessage("Updated successfully");
    this.resetMessage()
  }

  render() {
    const submissions = [
      {
        name: "Choose submission",
        value: "cs"
      },
      {
        name: "Project Descriptions",
        value: "pd"
      },
      {
        name: "Project Plans",
        value: "pp"
      },
      {
        name: "Initial Reports",
        value: "ir"
      },
      {
        name: "Final Reports",
        value: "fr"
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

