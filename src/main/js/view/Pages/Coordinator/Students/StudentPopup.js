import React, { Component } from "react";
import * as Style from "../Styles";
import { getName } from "../functions";
import ProjectDescription from "./ProjectDescription";

class StudentPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "projectDescription",
      studentId: this.props.studentId
    };
  }

  setPage(page) {
    this.setState({
      page: page
    });
  }

  renderPage() {
    if (this.state.page === "projectDescription") {
      return <ProjectDescription userId={this.state.studentId}/>;
    } else if (this.state.page === "projectPlan") {
      return <span>plan</span>;
    } else if (this.state.page === "initialReport") {
      return <span>initialReport</span>;
    } else if (this.state.page === "finalReport") {
      return <span>Final</span>;
    }
  }

  render() {
    return (
      <div style={Style.popup}>
        <div style={Style.popupInner}>
          <i
            className="fas fa-window-close"
            onClick={this.props.closePopup}
            style={Style.popupClose}
          />
          <h3 style={Style.popupName}>{getName(this.props.studentId)}</h3>
          <div style={Style.submissionMenu}>
            <button style={Style.submissionButtons} onClick={() => this.setPage("projectDescription")}>
              Project Description
            </button>
            <button style={Style.submissionButtons} onClick={() => this.setPage("projectPlan")}>
              Project Plan
            </button>
            <button style={Style.submissionButtons} onClick={() => this.setPage("initialReport")}>
              Initial Report
            </button>
            <button style={Style.submissionButtons} onClick={() => this.setPage("finalReport")}>
              Final Report
            </button>
          </div>
          {this.renderPage()}
        </div>
      </div>
    );
  }
}

export default StudentPopup;
