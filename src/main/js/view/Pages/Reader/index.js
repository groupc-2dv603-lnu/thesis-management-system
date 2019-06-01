"use strict";

import React, { Component } from "react";
import { postToAPI, getFromAPI, putToAPI } from "../../functions";

const mockState = {
  reports: [
    {
      id: "12348",
      name: "report1",
      author: "Nils Carlsson",
      downloadUrl: "www.test2422.se"
    },
    {
      id: "123488",
      name: "report2",
      author: "Anders Carlsson",
      downloadUrl: "www.test244.se"
    },
    {
      id: "123477",
      name: "report3",
      author: "Adam Svensson",
      downloadUrl: "www.test4332.se"
    },
    {
      id: "123465",
      name: "report4",
      author: "Axel Carlsson",
      downloadUrl: "www.test343.se"
    },
    {
      id: "123457",
      name: "report5",
      author: "Örjan Carlsson",
      downloadUrl: "www.test433.se"
    }
  ],
  selectedReports: [],
  requestedReports: false,
  initialReport: {
    id: "1253457",
    name: "report5",
    author: "Örjan Carlsson",
    downloadUrl: "www.test433.se"
  },
  finalReport: {
    id: "1253457",
    name: "report5",
    author: "Örjan Carlsson",
    downloadUrl: "www.test433.se"
  }
};

class Reader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      reports: [],
      selectedReports: [],
      initialReport: null,
      finalreport: null
    };
  }

  componentDidMount() {
    getFromAPI("/reader/initialReport").then(result => {
      this.setState({
        reports: result.entity._embedded.initialReports
      });
    });
    getFromAPI("/loginUser").then(user => {
      this.setState({
        user: user.entity
      });
    });
    getFromAPI("/reader/readerInfo").then(info => {
      console.log(info, "uhigu");
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
      postToAPI(`/reader/requestBidding?text=${report.id}`);
    });
  }

  sendInitialReport() {
    postToAPI(
      `/reader/feedbackInitialReport?text=${
        document.getElementById("initialreport").value
      }`
    );
  }

  sendFinalReport() {
    postToAPI(
      `/reader/feedbackFinalReport?text=${
        document.getElementById("finalreport").value
      }`
    );
  }

  render() {
    console.log(this.state);
    return (
      <div>
        {this.state.reports.length && (
          <div>
            <p>Välj rapporter</p>
            <table>
              <tbody>
                <tr>
                  <th style={styles.th}>Namn</th>
                  <th style={styles.th}>Författare</th>
                  <th style={styles.th}>ladda ner</th>
                  <th style={styles.th}>välj</th>
                </tr>
                {this.state.reports.map((report, index) => (
                  <tr key={index}>
                    <td key={report.name} style={styles.td}>
                      {report.name}
                    </td>
                    <td key={report.author} style={styles.td}>
                      {report.author}
                    </td>
                    <td key={report.downloadUrl} style={styles.td}>
                      ladda ner
                    </td>
                    <td key={report.id} style={styles.td}>
                      <input
                        type="checkbox"
                        name="selected"
                        value={report.id}
                        onClick={this.getChosenReports.bind(this)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p>Valda rapporter</p>
            <table>
              <tbody>
                <tr>
                  <th style={styles.th}>#</th>
                  <th style={styles.th}>Namn</th>
                  <th style={styles.th}>Författare</th>
                </tr>
                {this.state.selectedReports.map((reportId, index) => {
                  const report = this.state.reports.filter(
                    rep => rep.id === reportId
                  )[0];
                  return (
                    <tr key={index}>
                      <td style={styles.td} key={index}>
                        {index + 1}
                      </td>
                      <td style={styles.td} key={report.name}>
                        {report.name}
                      </td>
                      <td style={styles.td} key={report.author}>
                        {report.author}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button onClick={this.sendBiddedReports.bind(this)}>Skicka</button>
          </div>
        )}
        {this.state.initialReport && (
          <div>
            <p>
              Initial report: <span>Download</span>
            </p>
            <p>
              {`${this.state.initialReport.name}, ${
                this.state.initialReport.author
              }`}
            </p>
            <textarea rows="10" cols="70" id="initialreport" />
            <div>
              <button onClick={this.sendInitialReport.bind(this)}>
                Skicka
              </button>
            </div>
          </div>
        )}
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
  }
};
export default Reader;
