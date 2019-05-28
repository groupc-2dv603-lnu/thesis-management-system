import React, { Component } from "react";
import * as Style from "../Styles/Styles";
import * as PopupStyle from "../Styles/PopupStyles";
import * as SubBox from "../Styles/SubmissionBoxStyle";
import * as func from "../func";
import SubmissionBox from "./SubmissionBox";
import ProjectDescriptionBox from "./ProjectDescriptionBox";

class StudentPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: null,
      supervisorName: null,
      projectDescription: null,
      projectPlan: null,
      initialReport: null,
      finalReport: null
    };
  }

  async componentDidMount() {
    const submissions = await func.getAllSubmissions(this.props.student.userId);
    console.log(submissions)
    this.setState({
      supervisorName: await func.getSupervisorName(
        this.props.student.supervisorId
      ),
      projectDescription: submissions.projectDescriptions[0],
      projectPlan: submissions.projectPlans[0],
      initialReport: submissions.initialReports[0],
      finalReport: submissions.finalReports[0]
    });
  }

  setPage(page) {
    this.setState({
      page: page
    });
    // console.log("POPUPSTATE", this.state.page);
  }

  renderPage() {
    if (this.state.page === "projectDescription") {
      return (
        <ProjectDescriptionBox
          student={this.props.student}
          submission={this.state.projectDescription}
          type="projectDescription"
          key={this.state.page}
        />
      );
    } else if (this.state.page === "projectPlan") {
      return (
        <SubmissionBox
          student={this.props.student}
          submission={this.state.projectPlan}
          type="projectPlan"
          key={this.state.page}
        />
      );
    } else if (this.state.page === "initialReport") {
      return (
        <SubmissionBox
          student={this.props.student}
          submission={this.state.initialReport}
          type="initialReport"
          key={this.state.page}
        />
      );
    } else if (this.state.page === "finalReport") {
      return (
        <SubmissionBox
          student={this.props.student}
          submission={this.state.finalReport}
          type="finalReport"
          key={this.state.page}
        />
      );
    }
  }

  render() {
    return (
      <div style={PopupStyle.popup}>
        <div style={PopupStyle.popupInner}>
          <i
            className="fas fa-window-close"
            onClick={this.props.closePopup}
            style={PopupStyle.popupClose}
          />
          <h3 style={PopupStyle.popupHeader}>{this.props.student.name}</h3>
          <h5 styule={PopupStyle.popupSupervisor}>
            Supervisor: {this.state.supervisorName}
          </h5>
          <div style={PopupStyle.popupBody}>
            <div style={SubBox.submissionMenu}>
              <button
                style={SubBox.menuButtons}
                onClick={() => this.setPage("projectDescription")}
              >
                Project Description
              </button>
              <button
                style={SubBox.menuButtons}
                onClick={() => this.setPage("projectPlan")}
              >
                Project Plan
              </button>
              <button
                style={SubBox.menuButtons}
                onClick={() => this.setPage("initialReport")}
              >
                Initial Report
              </button>
              <button
                style={SubBox.menuButtons}
                onClick={() => this.setPage("finalReport")}
              >
                Final Report
              </button>
            </div>

            {this.renderPage()}
          </div>
        </div>
      </div>
    );
  }
}

export default StudentPopup;
