"use strict";

import React, { Component } from "react";
import Students from "../Coordinator/Students/Students";
import Reports from "../Coordinator/Reports/Reports";
import * as Style from "./Styles/Styles";

class Coordinator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "students" //sets coordinator start page
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(page) {
    this.setState({ page: page });
  }

  renderPage() {
    if (this.state.page === "students") {
      return <Students />;
    } else if (this.state.page === "reports") {
      return <Reports />;
    }
  }
  render() {
    return (
      <div>
        <button
          style={Style.headerButtons}
          onClick={() => this.handleChange("students")}
        >
          Students
        </button>
        <button
          style={Style.headerButtons}
          onClick={() => this.handleChange("reports")}
        >
          Initial Reports
        </button>

        <div style={Style.body}>

          {this.renderPage()}
        </div>
      </div>
    );
  }
}

export default Coordinator;
