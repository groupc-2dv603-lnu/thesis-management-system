"use strict";

import React, { Component } from "react";
import { postToAPI, getFromAPI } from "../../functions";

class Opponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finalReport: null
    };
  }

  componentDidMount() {
    getFromAPI("/loginUser").then(user => {
      this.setState({
        user: user.entity
      });
    });
    getFromAPI("/opponent/initailReportSubmission").then(info => {
      this.setState({
        finalReport: info.entity
      });
    });
  }

  sendFinalReport() {
    postToAPI(
      `/opponent/feedback?text=${
        document.getElementById("initial report").value
      }`
    );
  }

  render() {
    return (
      <div>
        {!!this.state.finalReport && (
          <div>
            <p>
              <a href={this.state.finalReport.fileUrl} style={{ display: "block" }}>Initial report: Download</a>
            </p>
            <p>
              {`${this.state.finalReport.filename}, ${
                this.state.finalReport.author
              }`}
            </p>
            <textarea rows="10" cols="70" id="initial report" />
            <div>
              <button onClick={this.sendFinalReport.bind(this)}>Send</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Opponent;
