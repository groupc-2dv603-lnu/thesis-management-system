import React, { Component } from "react";
import ReactTable from "react-table";
import { ReactTableDefaults } from "react-table";
import { Link } from "react-router-dom";
import * as Style from "../Styles"

/* ---- mock imports ---- */
import { getIRData, getName, getbidderNames } from '../functions'

const client = require("../../../../client");

class ReportsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
    }
    this.initialReports = getIRData()

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
            <span>{getName(props.original.studentId)}</span>
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
            <span>{props.original.assignedOpponent === null ? '0' : props.original.assignedOpponent.length}</span>
          </Link>
        )
      },
    ];

    return <ReactTable data={this.initialReports.entity} columns={columns} />;
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