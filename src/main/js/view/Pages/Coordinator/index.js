import React, { Component } from "react";
import StudentsTable from "./Students/StudentsTable";
import SubmissionDeadlines from "./Submissions/SubmissionDeadlines";
import ReportsTable from "./Reports/ReportsTable";
import * as Style from "./Styles/Styles";

class Coordinator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSetDeadline: false,
      showStudentsTable: false,
      showReportsTable: false
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
    //bugfix
    if (this.state.showReportsTable === true) {
      this.setState({
        showReportsTable: false
      });
    }
  }

  toggleReportsTable() {
    this.setState({
      showReportsTable: !this.state.showReportsTable
    });
    //bugfix
    if(this.state.showStudentsTable === true) {
      this.setState({
        showStudentsTable: false
      })
    }
  }

  render() {
    return (
      <div>
        {/* ---- SET DEADLINES ---- */}
        <div style={Style.dropDown} onClick={() => this.toggleSetDeadline()}>
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
        <div style={Style.dropDown} onClick={() => this.toggleStudentsTable()}>
          Show students
        </div>
        {this.state.showStudentsTable ? (
          <div>
            <StudentsTable />
          </div>
        ) : null}
        {/* ---- INITIAL REPORT TABLE ---- */}
        <div style={Style.dropDown} onClick={() => this.toggleReportsTable()}>
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

export default Coordinator;
