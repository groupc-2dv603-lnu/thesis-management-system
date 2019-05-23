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
  }

  setDeadline(event) {
    console.log(event.target.value)
  }

  handleSubmit() {
    console.log('handle submit!')
  }

  render() {
    const status = ['disabled', 'active', 'finished']

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
            <input
              style={Style.deadlineInput}
              type="text"
              placeholder="Set deadline"
              onChange={() => this.setDeadline(event)}
            />
            <select>
              {status.map(status => {
                return <option value={status}>{capitalizeFirstLetter(status)}</option>
              })}
            </select>
            <button onClick={() => this.handleSubmit()}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SubmissionPopup;
