import React, { Component } from "react";
import StudentsTable from "./StudentsTable";
import SubmissionDeadlines from "./SubmissionDeadlines";
import ReportsTable from '../Reports/ReportsTable'

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSetDeadline: false,
      showStudentsTable: false,
      showReportsTable: false,
    };
  }

  toggleSetDeadline() {
    this.setState({
      showSetDeadline: !this.state.showSetDeadline
    });
  }

  toggleStudentsTable() {
    this.setState({
      showStudentsTable: !this.state.showStudentsTable
    });
  }

  toggleReportsTable() {
    this.setState({
      showReportsTable: !this.state.showReportsTable
    });
  }

  render() {
    return (
      <div>
        {/* ---- SET DEADLINES ---- */}
        <div style={dropDown} onClick={() => this.toggleSetDeadline()}>
          Set deadlines
        </div>
        {this.state.showSetDeadline ? (
          <div>
            <SubmissionDeadlines
              toggleSetDeadline={() => this.toggleSetDeadline()}
            />
          </div>
        ) : null}
        {/* ---- STUDENTS TABLE ---- */}
        <div style={dropDown} onClick={() => this.toggleStudentsTable()}>
          Show students
        </div>
        {this.state.showStudentsTable ? (
          <div>
            <StudentsTable />
          </div>
        ) : null}
        {/* ---- INITIAL REPORT TABLE ---- */}
        <div style={dropDown} onClick={() => this.toggleReportsTable()}>
          Show Initial reports
        </div>
        {this.state.showReportsTable ? (
          <div>
            <ReportsTable />
          </div>
        ) : null}
      </div>
    );
  }
}

const dropDown = {
  width: "100%",
  background: "#ffee00",
  textAlign: "center",
  height: "30px",
  lineHeight: "30px",
  border: "1px solid black",
  fontWeight: "bold",
  marginBottom: '20px'
};

export default Students;
