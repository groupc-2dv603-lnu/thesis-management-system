import React, { Component } from "react";
import { capitalizeFirstLetter, checkDeadline } from "./functions";

/**
 *  Submission component
 *  TODO:
 *    -
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
      <div style={bodyDiv}>
        {this.state.submissions.map(submission => {
          return (
            <div style={submissionDiv} key={submission.id}>
              <div style={submissionHeaderStyle}>
                {capitalizeFirstLetter(submission.type)}
                <i
                  className="far fa-edit"
                  style={edit}
                  onClick={() => this.togglePopup(submission)}
                />
              </div>
              <div style={submissionRowStyle}>
                <span style={keyStyle}>Deadline</span>
                <span style={valueStyle}>
                  {checkDeadline(submission.deadline)}{" "}
                </span>
              </div>
              <div style={submissionRowStyle}>
                <span style={keyStyle}>Status</span>
                <span style={valueStyle}>
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
      <div style={popup}>
        <div style={popupInner}>
          <i class="fas fa-window-close" onClick={this.props.closePopup} style={popupClose} />
          <h1>Edit {capitalizeFirstLetter(this.props.submission.type)}</h1>
        </div>
      </div>
    );
  }
}

/* ---- Popup style ---- */
const innerSize = "30%";

const popup = {
  position: "fixed",
  width: "100%",
  height: "100%",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  margin: "auto",
  backgroundColor: "rgba(0,0,0, 0.5)"
};

const popupInner = {
  position: "absolute",
  left: innerSize,
  right: innerSize,
  top: innerSize,
  bottom: innerSize,
  margin: "auto",
  background: "white"
};

const popupClose = {
  float: 'right',
  width: '20px',
  height: '20px',
  margin: '10px'
}
/* ---- Submissions style ---- */
const rowHeight = "30px";
const lineHeight = "30px";

const bodyDiv = {
  width: "80%",
  marginTop: "30px",
  marginLeft: "10%"
};

const submissionDiv = {
  marginTop: "30px",
  border: "1px solid black"
};

const submissionHeaderStyle = {
  fontSize: "14px",
  fontWeight: "bold",
  textAlign: "center",
  borderBottom: "1px solid black",
  height: "30px",
  background: "#ffee00",
  lineHeight: lineHeight
};

const submissionRowStyle = {
  width: "100%",
  height: rowHeight,
  borderBottom: "1px solid black"
};

const keyStyle = {
  width: "30%",
  height: rowHeight,
  lineHeight: lineHeight,
  float: "left",
  background: "lightgrey",
  borderRight: "1px solid black"
};

const valueStyle = {
  width: "68%",
  float: "right",
  height: rowHeight,
  lineHeight: lineHeight
};

const edit = {
  float: "right",
  lineHeight: lineHeight,
  marginRight: "10px"
};
export default Submission;
