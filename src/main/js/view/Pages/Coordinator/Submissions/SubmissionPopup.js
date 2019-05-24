import React, { Component } from "react";
import * as Style from "../Styles";
import { capitalizeFirstLetter } from "../functions";

class SubmissionPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submission: null
    };
    console.log("subpopupProps", this.props);
    console.log('subpopupState', this.state)
  }

  setDeadline(event) {
    this.props.submission.deadline = event.target.value
  }

  setStatus(event) {
    this.props.submission.deadline = event.target.value
  }

  handleSubmit() {
    console.log('Send this:', this.props.submission)
  }

  render() {
    let i = 0;
    const status = ["disabled", "active", "finished"];
    const dateFormatPlaceholder = 'xxxx-xx-xx'

    return (
      <div style={Style.popup}>
        <div style={Style.popupInner}>
          <i
            className="fas fa-window-close"
            onClick={this.props.closePopup}
            style={Style.popupClose}
          />
          <h3 style={Style.popupName}>
            {capitalizeFirstLetter(this.props.submission.type)}
          </h3>
          <div style={Style.subPopupBody}>
            <div style={Style.subPopupRow}>
              <span style={Style.subPopupLeft}>Deadline: </span>
              <input
                style={Style.deadlineInput}
                type="text"
                placeholder={dateFormatPlaceholder}
                onChange={() => this.setDeadline(event)}
              />
            </div>

            <div style={Style.subPopupRow}>
              <span style={Style.subPopupLeft}>Status: </span>

              <select onChange={() => this.setStatus(event)}>
                {status.map(status => {
                  return (
                    <option value={status} key={i++}>
                      {capitalizeFirstLetter(status)}
                    </option>
                  );
                })}
              </select>
            </div>
            <div style={Style.subPopupRow}>
              <button onClick={() => this.handleSubmit()}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SubmissionPopup;
