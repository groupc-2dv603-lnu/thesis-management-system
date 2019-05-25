import React, { Component } from "react";
import * as Style from "../Styles/Styles";
import * as PopupStyle from "../Styles/PopupStyles";
import * as SubBox from "../Styles/SubmissionBoxStyle";
import * as func from "../func";
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
     // Breaks page, get list of students
    /*
    return (
      <SubmissionBox
        user={this.props.user}
        type={this.state.page}
        key={this.state.page}
      />
    );
    */
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
          <h3 style={PopupStyle.popupHeader}>{func.capitalizeFirstLetter(this.props.user.name)}</h3>
          <div style={PopupStyle.popupBody}>
            <div style={SubBox.submissionMenu}>
              <button
                style={SubBox.menuButtons}
                onClick={() => this.setPage("project description")}
              >
                Project Description
              </button>
              <button
                style={SubBox.menuButtons}
                onClick={() => this.setPage("project plan")}
              >
                Project Plan
              </button>
              <button
                style={SubBox.menuButtons}
                onClick={() => this.setPage("initial report")}
              >
                Initial Report
              </button>
              <button
                style={SubBox.menuButtons}
                onClick={() => this.setPage("final report")}
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
