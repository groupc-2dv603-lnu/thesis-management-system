import React, { Component } from "react";
import ReactTable from "react-table";
import { ReactTableDefaults } from "react-table";
import { Link } from "react-router-dom";

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
        headerStyle: headerNameCellStyle,
        style: nameColumnStyle,
        accessor: "submitter",
        resizable: true,
        filterable: false, // ugly but good, case sensitive...
        Cell: props => (
            <span style={nameColumnStyle}>{getName(props.original.studentId)}</span>
        )
      },
      {
        Header: "Bidders",
        headerStyle: headerSubmissionStyle,
        style: submissionColumnStyle,
        accessor: "bidders",
        maxWidth: columnMaxWidth,
        Cell: props => (
          <span>
          {props.original.bids.length === 0 ? 'No bids' : getbidderNames(props.original.bids)  }
          </span>
        )
      },
      {
        Header: "Readers",
        accessor: "readers",
        headerStyle: headerSubmissionStyle,
        style: submissionColumnStyle,
        maxWidth: columnMaxWidth,
        Cell: props => (
          <Link to="#">
            <span>reader1 ...</span>
          </Link>
        )
      },
      {
        Header: "Opponents",
        accessor: "opponents",
        headerStyle: headerSubmissionStyle,
        style: submissionColumnStyle,
        maxWidth: columnMaxWidth,
        Cell: props => (
          <Link to="#">
            <span>opponent1...</span>
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

/* ---- TABLE STYLING ---- */
const headerBackgroundColor = "#ffe000";
const headerFontColor = "black";
const headerFontWeight = "bold";
const nameColumnMinWidth = "40%";
const headerRowHeight = 40;
const lineHeight = 2;

const headerNameCellStyle = {
  minWidth: nameColumnMinWidth,
  background: headerBackgroundColor,
  color: headerFontColor,
  fontWeight: headerFontWeight,
  height: headerRowHeight,
  lineHeight: lineHeight,
  border: "1px solid black"
};

// width is set in renderMethod
const headerSubmissionStyle = {
  background: headerBackgroundColor,
  color: headerFontColor,
  fontWeight: headerFontWeight,
  height: headerRowHeight,
  lineHeight: lineHeight,
  border: "1px solid black",
};

const nameColumnStyle = {
  minWidth: nameColumnMinWidth,
  width: nameColumnMinWidth
};

const submissionColumnStyle = {
  textAlign: "center"
};
 
export default ReportsTable;