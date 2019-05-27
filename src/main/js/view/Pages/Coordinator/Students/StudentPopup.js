import React, { Component } from "react";
import * as Style from "../Styles";
import { getName } from "../functions";
import SubmissionBox from "./SubmissionBox";

class StudentPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "project description"
    };
  }

  setPage(page) {
    this.setState({
      page: page
    });
  }

  renderPage() {
    return (
      <SubmissionBox
        userId={this.props.userId}
        type={this.state.page}
        key={this.state.page}
      />
    );
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
          <h3 style={Style.popupName}>{getName(this.props.userId)}</h3>
          <div style={Style.submissionMenu}>
            <button
              style={Style.submissionButtons}
              onClick={() => this.setPage("project description")}
            >
              Project Description
            </button>
            <button
              style={Style.submissionButtons}
              onClick={() => this.setPage("project plan")}
            >
              Project Plan
            </button>
            <button
              style={Style.submissionButtons}
              onClick={() => this.setPage("initial report")}
            >
              Initial Report
            </button>
            <button
              style={Style.submissionButtons}
              onClick={() => this.setPage("final report")}
            >
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
