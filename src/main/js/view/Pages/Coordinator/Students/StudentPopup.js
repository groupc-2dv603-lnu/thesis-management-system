import React, { Component } from "react";
import * as PopupStyle from "../Styles/PopupStyles";
import * as SubBox from "../Styles/SubmissionBoxStyle";
import * as func from "./studentFunctions/studentFunctions";
import ProjectDescriptionBox from "./submissionBoxes/ProjectDescriptionBox";
import ProjectPlanBox from "./submissionBoxes/ProjectPlanBox";
import InitialReportBox from "./submissionBoxes/InitialReportBox";
import FinalReportBox from "./submissionBoxes/FinalReportBox";

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

      //feedbacks
      initialReportFeedbacks: null,
      finalReportFeedbacks: null,

      loading: true
    };
  }

  async componentDidMount() {
    const submissions = await func.getAllSubmissions(this.props.student.userId);
    console.log(submissions);
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

      // FEEDBACKS
      initialReportFeedbacks: await func.getFeedbacks(
        submissions.initialReports[0].feedBackIds
      ),

      finalReportFeedbacks: await func.getFeedbacks(
        submissions.finalReports[0].feedBackIds
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
          feedback={this.state.planFeedback}
          type="projectPlan"
          key={this.state.page}
        />
      );
    } else if (this.state.page === "initialReport") {
      return (
        <InitialReportBox
          initialReport={this.state.initialReport}
          feedbacks={this.state.initialReportFeedbacks}
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
          feedbacks={this.state.finalReportFeedbacks}
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
          <div style={PopupStyle.headerDiv}>
          <div style={PopupStyle.closeButtonDiv}>
            <i
              className="fas fa-window-close"
              onClick={this.props.closePopup}
              style={PopupStyle.popupClose}
            />
          </div>
          <div style={PopupStyle.popupHeader}>
                {this.props.student.name}
              </div>
              <div style={PopupStyle.popupSupervisor}>
                {this.state.supervisorName}
              </div>
          </div>
          {this.state.loading === true ? (
            <div style={PopupStyle.loading}>Loading...</div>
          ) : (
            <div>

              <div style={PopupStyle.popupBody}>
                <div style={SubBox.submissionMenu}>
                  <div
                    style={SubBox.menuButtons}
                    onClick={() => this.setPage("projectDescription")}
                  >
                    Project Description
                  </div>
                  <div
                    style={SubBox.menuButtons}
                    onClick={() => this.setPage("projectPlan")}
                  >
                    Project Plan
                  </div>
                  <div
                    style={SubBox.menuButtons}
                    onClick={() => this.setPage("initialReport")}
                  >
                    Initial Report
                  </div>
                  <div
                    style={SubBox.menuButtons}
                    onClick={() => this.setPage("finalReport")}
                  >
                    Final Report
                  </div>
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
