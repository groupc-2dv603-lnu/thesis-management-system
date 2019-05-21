"use strict";

import React, { Component } from "react";
const client = require("../../../client");

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
  receivedReport: false
};

class Reader extends Component {
  constructor(props) {
    super(props);
    this.state = mockState;
  }

  componentDidMount() {
    client({ method: "GET", path: "/users" }).then(response => {
      this.setState({ users: response.entity._embedded.users });
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
    }
  }

  sendBiddedReports() {
    // mock
  }

  render() {
    return (
      <div>
        <div className="flexDiv">
          <table className="tableReports">
            <tbody>
              <tr>
                <th>Namn</th>
                <th>Författare</th>
                <th>ladda ner</th>
              </tr>
              {this.state.reports.map((report, index) => (
                <tr key={index}>
                  <td key={report.name}>{report.name}</td>
                  <td key={report.author}>{report.author}</td>
                  <td key={report.downloadUrl}>ladda ner</td>
                  <td key={report.id}>
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
          <table>
            <tbody>
              <tr>
                <th>#</th>
                <th>Namn</th>
                <th>Författare</th>
              </tr>
              {this.state.selectedReports.map((reportId, index) => {
                const report = this.state.reports.filter(
                  rep => rep.id === reportId
                )[0];
                return (
                  <tr key={index}>
                    <td key={index}>{index + 1}</td>
                    <td key={report.name}>{report.name}</td>
                    <td key={report.author}>{report.author}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button onClick={this.sendBiddedReports.bind(this)}>Skicka</button>
      </div>
    );
  }
}

export default Reader;
