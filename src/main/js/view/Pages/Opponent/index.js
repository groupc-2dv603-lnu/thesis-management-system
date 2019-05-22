"use strict";

import React, { Component } from "react";
const client = require("../../../client");

const mockState = {
  finalReport: {
    id: "1253457",
    name: "report5",
    author: "Örjan Carlsson",
    downloadUrl: "www.test433.se"
  }
};

class Opponent extends Component {
  constructor(props) {
    super(props);
    this.state = mockState;
  }

  componentDidMount() {
    client({ method: "GET", path: "/users" }).then(response => {
      this.setState({ users: response.entity._embedded.users });
    });
  }

  sendFinalReport() {
    console.log(document.getElementById("finalreport").value);
  }

  render() {
    return (
      <div>
        {this.state.finalReport && (
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
