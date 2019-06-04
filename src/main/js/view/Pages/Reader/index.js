"use strict";

import React, { Component } from "react";
import { postToAPI, getFromAPI, putToAPI } from "../../functions";

class Reader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      reports: [],
      selectedReports: [],
      initialReport: null,
      finalReport: null,
      sentInitial: false,
      sentFinal: false
    };
  }

  componentDidMount() {
    getFromAPI("/reader/initialReports").then(result => {
      this.setState({
        reports: result.entity._embedded.objectNodes
      });
    });
    getFromAPI("/loginUser").then(user => {
      this.setState({
        user: user.entity
      });
    });
    getFromAPI("/reader/initailReportSubmission").then(info => {
      this.setState({
        initialReport: info.entity
      });
    });
    getFromAPI("/reader/finalReportSubmission").then(info => {
      this.setState({
        finalReport: info.entity
      });
    });
    getFromAPI("/loginUser").then(user => {
      this.setState({
        user: user.entity
      });
    });
  }

  getChosenReports(event) {
    if (event.target.checked) {
      this.setState({
        selectedReports: [...this.state.selectedReports, event.target.value]
      });
    } else {
      this.setState({
        selectedReports: this.state.selectedReports.filter(
          id => id !== event.target.value
        )
      });
    }
    const inputs = document.getElementsByName("selected");
    if (Array.from(inputs).filter(input => input.checked).length > 3) {
      for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].checked) {
          inputs[i].disabled = true;
        }
      }
    } else {
      for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].checked) {
          inputs[i].disabled = false;
        }
      }
    }
  }

  sendBiddedReports() {
    this.state.selectedReports.map(report => {
      putToAPI(`/reader/requestBidding?initialReportId=${report}`);
    });
  }

  sendInitialReport() {
    postToAPI(
      `/reader/feedbackInitialReport?text=${
        document.getElementById("initialreport").value
      }`
    );
    this.setState({
      sentInitial: true
    });
    document.getElementById("initialreport").value = "";
  }

  sendFinalReport() {
    postToAPI(
      `/reader/feedbackFinalReport?text=${
        document.getElementById("finalreport").value
      }`
    );
    this.setState({
      sentFinal: true
    });
    document.getElementById("finalreport").value = "";
  }

  render() {
    return (
      <div>
        {!!this.state.reports.length && (
          <div>
            <p>Choose reports to bid on:</p>
            <table>
              <tbody>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Author</th>
                  <th style={styles.th}>Download</th>
                  <th style={styles.th}>Choose</th>
                </tr>
                {this.state.reports.map((report, index) => (
                  <tr key={index}>
                    <td key={report.content.filename} style={styles.td}>
                      {report.content.filename}
                    </td>
                    <td key={report.content.author} style={styles.td}>
                      {report.content.author}
                    </td>
                    <td key={report.content.fileUrl} style={styles.td}>
                      <a
                        href={report.content.fileUrl}
                        style={{ display: "block" }}
                      >
                        Download
                      </a>
                    </td>
                    <td key={report.content.id} style={styles.td}>
                      <input
                        type="checkbox"
                        name="selected"
                        value={report.content.id}
                        onClick={this.getChosenReports.bind(this)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p>Choosen reports</p>
            <table>
              <tbody>
                <tr>
                  <th style={styles.th}>#</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Author</th>
                </tr>
                {this.state.selectedReports.map((reportId, index) => {
                  const report = this.state.reports.filter(
                    rep => rep.content.id === reportId
                  )[0];
                  return (
                    <tr key={index}>
                      <td style={styles.td} key={index}>
                        {index + 1}
                      </td>
                      <td style={styles.td} key={report.content.filename}>
                        {report.content.filename}
                      </td>
                      <td style={styles.td} key={report.content.author}>
                        {report.content.author}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button onClick={this.sendBiddedReports.bind(this)}>Send</button>
          </div>
        )}
        {!!this.state.initialReport && (
          <div>
            <p>
              <a
                href={this.state.initialReport.fileUrl}
                style={{ display: "block" }}
              >
                Initial report: Download
              </a>
            </p>
            <p>
              {`${this.state.initialReport.filename}, ${
                this.state.initialReport.author
              }`}
            </p>
            <textarea rows="10" cols="70" id="initialreport" />
            <div>
              <button onClick={this.sendInitialReport.bind(this)}>Send</button>
            </div>
          </div>
        )}
        {this.state.sentInitial && <p style={styles.green}>Sent</p>}
        {!!this.state.finalReport && (
          <div>
            <p>
              <a
                href={this.state.finalReport.fileUrl}
                style={{ display: "block" }}
              >
                Final report: Download
              </a>
            </p>
            <p>
              {`${this.state.finalReport.filename}, ${
                this.state.finalReport.author
              }`}
            </p>
            <textarea rows="10" cols="70" id="finalreport" />
            <div>
              <button onClick={this.sendFinalReport.bind(this)}>Send</button>
            </div>
          </div>
        )}
        {this.state.sentFinal && <p style={styles.green}>Sent</p>}
      </div>
    );
  }
}

const styles = {
  th: {
    backgroundColor: "#ffe000",
    padding: "5px",
    margin: "0pxs",
    border: "1px solid black"
  },
  td: {
    border: "1px solid black",
    margin: "0px",
    padding: "5px"
  },
  green: {
    color: "green"
  }
};
export default Reader;
