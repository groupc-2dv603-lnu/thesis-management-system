import React, { Component } from "react";
import ReactTable from "react-table";
import { ReactTableDefaults } from "react-table";
import { Link } from "react-router-dom";
import * as Style from "../Styles/TableStyles";
import ReportPopup from "./ReportPopup";

/* ---- mock imports ---- */
import { getStudents, getInitialReports, getName } from "../functions";

const client = require("../../../../client");

class ReportsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      initialReports: [],
      selectedReportId: null,
      showPopup: false
    };
    this.state.users = getStudents();
    this.state.initialReports = getInitialReports(this.state.users);
  }

  togglePopup(reportId) {
    this.setState({
      selectedReportId: reportId
    });
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    /* ---- Table ---- */
    const columnMaxWidth = 120;
    const columns = [
      {
        Header: "Submitter",
        headerStyle: Style.headerNameCellStyle,
        style: Style.nameColumnStyle,
        accessor: "submitter",
        resizable: true,
        filterable: false, // ugly but good, case sensitive...
        Cell: props => (
          <span
            onClick={() => {
              this.togglePopup(props.original.id);
            }}
          >
            {getName(props.original.userId)}
          </span>
        )
      },
      {
        Header: "Bidders",
        headerStyle: Style.headerSubmissionStyle,
        style: Style.submissionColumnStyle,
        accessor: "bidders",
        maxWidth: columnMaxWidth,
        Cell: props => (
          <Link to="#">
            <span>{props.original.bids.length}</span>
          </Link>
        )
      },
      {
        Header: "Readers",
        accessor: "readers",
        headerStyle: Style.headerSubmissionStyle,
        style: Style.submissionColumnStyle,
        maxWidth: columnMaxWidth,
        Cell: props => (
          <Link to="#">
            <span>{props.original.assignedReaders.length}</span>
          </Link>
        )
      },
      {
        Header: "Opponents",
        accessor: "opponents",
        headerStyle: Style.headerSubmissionStyle,
        style: Style.submissionColumnStyle,
        maxWidth: columnMaxWidth,
        Cell: props => (
          <Link to="#">
            <span>
              {props.original.assignedOpponent === null
                ? "0"
                : props.original.assignedOpponent.length}
            </span>
          </Link>
        )
      }
    ];

    return (
      <div>
        <ReactTable data={this.state.initialReports} columns={columns} />{" "}
        {this.state.showPopup ? (
          <ReportPopup
            report={this.state.selectedReportId}
            closePopup={this.togglePopup.bind(this)}
          />
        ) : null}
      </div>
    );
  }
}
/* ---- Table configs ---- */
Object.assign(ReactTableDefaults, {
  defaultPageSize: 25,
  minRows: 0,
  showPagination: false,
  resizable: false,
  showPageSizeOptions: false
});
export default ReportsTable;
