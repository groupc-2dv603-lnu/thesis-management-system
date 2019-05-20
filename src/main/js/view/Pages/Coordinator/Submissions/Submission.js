import React, { Component } from "react";
import { capitalizeFirstLetter, checkDeadline } from "./functions";
import * as style from "./submissionStyles";
/**
 *  Submission component
 *  TODO:
 *    - Form, post changes, 
 *    - Styling
 */
// Mock import
import { getSubmissions } from "./SubMock";

class Submission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submissions: getSubmissions(),
      submission: null,
      showPopup: false
    };
  }

  togglePopup(submission) {
    this.setState({
      submission: submission
    });
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    return (
      <div style={style.bodyDiv}>
        {this.state.submissions.map(submission => {
          return (
            <div style={style.submissionDiv} key={submission.id}>
              <div style={style.submissionHeaderStyle}>
                {capitalizeFirstLetter(submission.type)}
                <i
                  className="far fa-edit"
                  style={style.edit}
                  onClick={() => this.togglePopup(submission)}
                />
              </div>
              <div style={style.submissionRowStyle}>
                <span style={style.keyStyle}>Deadline</span>
                <span style={style.valueStyle}>
                  {checkDeadline(submission.deadline)}{" "}
                </span>
              </div>
              <div style={style.submissionRowStyle}>
                <span style={style.keyStyle}>Status</span>
                <span style={style.valueStyle}>
                  {capitalizeFirstLetter(submission.status)}
                </span>
              </div>
            </div>
          );
        })}
        {this.state.showPopup ? (
          <Popup
            submission={this.state.submission}
            closePopup={this.togglePopup.bind(this)}
          />
        ) : null}
      </div>
    );
  }
}

//https://codepen.io/bastianalbers/pen/PWBYvz
class Popup extends React.Component {
  render() {
    console.log("props", this.props);
    return (
      <div style={style.popup}>
        <div style={style.popupInner}>
          <i
            className="fas fa-window-close"
            onClick={this.props.closePopup}
            style={style.popupClose}
          />
          <h1>Edit {capitalizeFirstLetter(this.props.submission.type)}</h1>
          <form>
            <div>
              <label>Deadline</label>
              <input
                type="text"
                placeholder={capitalizeFirstLetter(
                  this.props.submission.deadline
                )}
              />
            </div>
            <div>
              <label>Status</label>
              <input
                type="text"
                placeholder={capitalizeFirstLetter(
                  this.props.submission.status
                )}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Submission;
