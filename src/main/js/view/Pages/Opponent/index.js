"use strict";

import React, { Component } from "react";
import { postToAPI, getFromAPI, putToAPI } from "../../functions";

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
      console.log(info, "uhigu");
      console.log("Filename: " + info.entity.filename);
      console.log("Entity: " + info.entity);
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
              Initial report: <span>Download</span>
            </p>
            <p>
              {`${this.state.finalReport.filename}, ${
                this.state.finalReport.author
              }`}
            </p>
            <textarea rows="10" cols="70" id="initial report" />
            <div>
              <button onClick={this.sendFinalReport.bind(this)}>Skicka</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Opponent;
