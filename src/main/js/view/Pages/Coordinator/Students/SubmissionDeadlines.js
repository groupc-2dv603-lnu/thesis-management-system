import React, { Component } from "react";
import * as generalFunctions from "../../../functions";

class SubmissionDeadlines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submission: null,
      newDeadlineDate: "",
      newDeadlineTime: "",
      showMessage: false,
      message: ""
    };
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

  async handleSubmit() {
    this.toggleMessage("Loading");
    const deadline = `${this.state.newDeadlineDate}T${
      this.state.newDeadlineTime
    }:00`;

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
        const request = await generalFunctions.updateSubmission2(
          "pd",
          submission
        );
      } else if (this.state.submission === "pp") {
        let submission = submissions.entity.projectPlans[0];
        submission.deadLine = deadline;
        const request = await generalFunctions.updateSubmission2(
          "pp",
          submission
        );
      } else if (this.state.submission === "ir") {
        let submission = submissions.entity.initialReports[0];
        submission.deadLine = deadline;
        const request = await generalFunctions.updateSubmission2(
          "ir",
          submission
        );
      } else if (this.state.submission === "fr") {
        let submission = submissions.entity.finalReports[0];
        submission.deadLine = deadline;
        const request = await generalFunctions.updateSubmission2(
          "fr",
          submission
        );
      }
    }
    this.toggleMessage("");
    this.toggleMessage("Updated successfully");
    this.props.toggleSetDeadline()

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
        <div style={selectSubmissionDiv}>
          <div style={deadlineRow}>
            <div style={deadlineRowLeft}>Set deadline for all </div>
            <div style={deadlineRowRight}>
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
          <div style={deadlineRow}>
            <div style={deadlineRowLeft}>Date and time</div>
            <div style={deadlineRowRight}>
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
          <div style={submitRow} onClick={() => this.handleSubmit()}>
            Submit
          </div>
          {this.state.showMessage === true ? (
            <div style={submitRow}>{this.state.message}</div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default SubmissionDeadlines;

const selectSubmissionDiv = {};

const deadlineRow = {
  height: "30px",
  lineHeight: "30px",
  width: "100%",
  borderBottom: "1px solid black",
  borderLeft: '1px solid black',
  borderRight: '1px solid black'
};

const deadlineRowLeft = {
  width: "30%",
  background: "lightgrey",
  float: "left",
  borderRight: "1px solid black",
};

const deadlineRowRight = {
  float: "left",
  width: "60%",
  marginLeft: "5px",
};

const submitRow = {
  width: "100%",
  textAlign: "center",
  height: "30px",
  lineHeight: "30px",
  fontWeight: "bold",
  background: "#ffee00",
  border: '1px solid black'
};
