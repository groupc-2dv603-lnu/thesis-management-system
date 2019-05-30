import React, { Component } from "react";
import * as PopupStyle from "../Styles/PopupStyles";
import * as SubBox from "../Styles/SubmissionBoxStyle";
import * as func from "./studentFunctions/studentFunctions";
import ProjectDescriptionBox from "./ProjectDescriptionBox";
import ProjectPlanBox from "./ProjectPlanBox";
import InitialReportBox from "./InitialReportBox";
import FinalReportBox from "./FinalReportBox";

class StudentPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: null,
      supervisorName: null,

      //stored as eg. projectPlan collection in db
      projectDescription: null,
      projectPlan: null,
      initialReport: null,
      finalReport: null,

      //Stored as submissionCollections in db
      projectDescriptionSubmission: null,
      projectPlanSubmission: null,
      initialReportSubmission: null,
      finalReportSubmission: null,
      loading: true
    };
  }

  async componentDidMount() {
    const submissions = await func.getAllSubmissions(this.props.student.userId);

    this.setState({
      supervisorName: await func.getSupervisorName(
        this.props.student.supervisorId
      ),
      projectDescription: submissions.projectDescriptions[0],
      projectPlan: submissions.projectPlans[0],
      initialReport: submissions.initialReports[0],
      finalReport: submissions.finalReports[0],

      projectDescriptionSubmission: await func.getSubmission(
        submissions.projectDescriptions[0].submissionId
      ),
      projectPlanSubmission: await func.getSubmission(
        submissions.projectPlans[0].submissionId
      ),
      initialReportSubmission: await func.getSubmission(
        submissions.initialReports[0].submissionId
      ),
      finalReportSubmission: await func.getSubmission(
        submissions.finalReports[0].submissionId
      ),
      loading: false
    });
  }

  setPage(page) {
    this.setState({
      page: page
    });
  }

  renderPage() {
    if (this.state.page === "projectDescription") {
      return (
        <ProjectDescriptionBox
          projectDescription={this.state.projectDescription}
          submission={this.state.projectDescriptionSubmission}
          type="projectDescription"
          key={this.state.page}
        />
      );
    } else if (this.state.page === "projectPlan") {
      return (
        <ProjectPlanBox
          projectPlan={this.state.projectPlan}
          submission={this.state.projectPlanSubmission}
          type="projectPlan"
          key={this.state.page}
        />
      );
    } else if (this.state.page === "initialReport") {
      return (
        <InitialReportBox
          initialReport={this.state.initialReport}
          submission={this.state.initialReportSubmission}
          type="initialReport"
          key={this.state.page}
        />
      );
    } else if (this.state.page === "finalReport") {
      return (
        <FinalReportBox
          finalReport={this.state.finalReport}
          submission={this.state.finalReportSubmission}
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
          <div style={PopupStyle.closeButtonDiv}>
            <i
              className="fas fa-window-close"
              onClick={this.props.closePopup}
              style={PopupStyle.popupClose}
            />
          </div>
          {this.state.loading === true ? (
            <div style={PopupStyle.loading}>Loading...</div>
          ) : (
            <div>
              <h3 style={PopupStyle.popupHeader}>{this.props.student.name}</h3>
              <h5 style={PopupStyle.popupSupervisor}>
                {this.state.supervisorName}
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
          )}
        </div>
      </div>
    );
  }
}

export default StudentPopup;
