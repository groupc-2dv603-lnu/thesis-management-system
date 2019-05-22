import React, { Component } from "react";
import { getName } from "../functions";
import * as Style from "../Styles";

class Feedback extends Component {
  render() {
    return (
      <div>
        {this.props.feedback !== undefined ? (
          <div style={Style.feedback}>
            <span style={Style.feedbackInfo}>Feedback</span>
            <span style={Style.feedbackInfo}>
              Provided by: {getName(this.props.feedback.userId)}
            </span>
            <span style={Style.feedbackInfo}>
              Role: {this.props.feedback.role}
            </span>
            <textarea
              style={Style.textarea}
              value={this.props.feedback.text}
              onChange={()=> this.props.handleChangeFeedback(event)}
              ></textarea>
          </div>
          
        ) : (
          <div>'no feedback provided'</div>
        )}
      </div>
    );
  }
}

export default Feedback;
