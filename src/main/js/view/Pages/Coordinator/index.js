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
    if (this.state.showStudentsTable === true) {
      this.setState({
        showStudentsTable: false
      });
    }
  }

  getStudentsTable(boolean) {
    return boolean === false ? (
      <div style={Style.dropDown} onClick={() => this.toggleStudentsTable()}>
        Show studentstable
      </div>
    ) : (
      <div style={Style.isActive} onClick={() => this.toggleStudentsTable()}>
        Hide Studentstable
      </div>
    );
  }

  getReportsTable (boolean) {
    return boolean === false ? (
      <div style={Style.dropDown} onClick={() => this.toggleReportsTable()}>
        Show Initial reports
       </div>
    ) : (
      <div style={Style.isActive} onClick={() => this.toggleReportsTable()}>
        Hide Initial reports
      </div>
    );
  }

  getSetDeadlines (boolean) {
    return boolean === false ? (
      <div style={Style.dropDown} onClick={() => this.toggleSetDeadline()}>
      Set deadlines
    </div>
    ) : (
      <div style={Style.isActive} onClick={() => this.toggleSetDeadline()}>
      Hide Set deadlines      
      </div>
    );
  }
  render() {
    return (
      <div>
        {/* ---- SET DEADLINES ---- */}
        {this.getSetDeadlines(this.state.showSetDeadline)}
        {this.state.showSetDeadline ? (
          <div>
            <SubmissionDeadlines
              toggleSetDeadline={() => this.toggleSetDeadline()}
            />
          </div>
        ) : null}
        {/* ---- STUDENTS TABLE ---- */}
        {this.getStudentsTable(this.state.showStudentsTable)}
        {this.state.showStudentsTable ? (
          <div>
            <StudentsTable />
          </div>
        ) : null}
        {/* ---- INITIAL REPORT TABLE ---- */}
        {this.getReportsTable(this.state.showReportsTable)}
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
