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
    getFromAPI("/opponent/opponentInfo").then(info => {
      console.log(info, "uhigu");
      this.setState({
        finalReport: info.entity.finalReportId
      });
    });
  }

  sendFinalReport() {
    postToAPI(
      `/opponent/feedbackFinalReport?text=${
        document.getElementById("finalreport").value
      }`
    );
  }

  render() {
    return (
      <div>
        {!!this.state.finalReport && (
          <div>
            <p>
              Final report: <span>Download</span>
            </p>
            <p>
              {`${this.state.finalReport.name}, ${
                this.state.finalReport.author
              }`}
            </p>
            <textarea rows="10" cols="70" id="finalreport" />
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
