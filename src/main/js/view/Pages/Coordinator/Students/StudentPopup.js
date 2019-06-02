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

      projectDescription: null,
      projectPlan: null,
      initialReport: null,
      finalReport: null,
      initialReportFeedback: null,
      finalReportFeedback: null,
      message: "",
      showMessage: false,
      loading: false
    };
    this.getMessage = this.getMessage.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const submissions = await func.getAllSubmissions(this.props.student.userId);
    if (submissions !== undefined) {
      this.setState({
        projectDescription: submissions.projectDescriptions[0],
        projectPlan: submissions.projectPlans[0],
        initialReport: submissions.initialReports[0],
        finalReport: submissions.finalReports[0]
      });
      const initialReportFeedback = await func.getFeedbacks(
        this.state.initialReport.feedBackIds
      );
      const finalReportFeedback = await func.getFeedbacks(
        this.state.finalReport.feedBackIds
      )
      this.setState({
        initialReportFeedback: initialReportFeedback,
        finalReportFeedback, finalReportFeedback,
        loading: false
      });
    } else {
      this.toggleMessage("Submissions not found");
    }

  }

  setPage(page) {
    this.setState({
      page: page
    });
  }

  toggleMessage(message) {
    this.setState({
      message: message,
      showMessage: !this.state.showMessage
    });
  }
  getMessage() {
    return <div style={PopupStyle.message}>{this.state.message}</div>;
  }

  renderPage() {
    if (this.state.page === "projectDescription") {
      return (
        <ProjectDescriptionBox
          projectDescription={this.state.projectDescription}
          submission={this.props.student.projectDescription}
          type="projectDescription"
          key={this.state.page}
        />
      );
    } else if (this.state.page === "projectPlan") {
      return (
        <ProjectPlanBox
          projectPlan={this.state.projectPlan}
          submission={this.props.student.projectPlan}
          type="projectPlan"
          key={this.state.page}
        />
      );
    } else if (this.state.page === "initialReport") {
      return (
        <InitialReportBox
          initialReport={this.state.initialReport}
          submission={this.props.student.initialReport}
          feedbacks={this.state.initialReportFeedback}
          type="initialReport"
          key={this.state.page}
        />
      );
    } else if (this.state.page === "finalReport") {
      return (
        <FinalReportBox
          finalReport={this.state.finalReport}
          submission={this.props.student.finalReport}
          feedbacks={this.state.finalReportFeedback}
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
            <div style={PopupStyle.popupHeader}>{this.props.student.name}</div>
            <div style={PopupStyle.popupSupervisor}>
              {this.props.assignedSupervisorName !== null
                ? `Supervisor: ${this.props.assignedSupervisorName}`
                : `No supervisor assigned`}
            </div>
          </div>
          <div>
            {this.state.showMessage === true ? this.getMessage() : null}
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
