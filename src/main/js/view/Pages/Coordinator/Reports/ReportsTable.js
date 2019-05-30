import React, { Component } from "react";
import ReactTable from "react-table";
import { ReactTableDefaults } from "react-table";
import { Link } from "react-router-dom";
import * as Style from "../Styles/TableStyles";
import ReportPopup from "./ReportPopup";
import * as func from './reportFunctions/reportFunctions'

const client = require("../../../../client");

class ReportsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      initialReports: [],
      selectedReport: null,
      showPopup: false,
      loading: false,
      // pages: -1,
    };
  }

  async togglePopup(report) {
    this.setState({
      selectedReport: report
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
        Header: "Name",
        headerStyle: Style.headerNameCellStyle,
        style: Style.nameColumnStyle,
        accessor: "submitter",
        resizable: true,
        filterable: false, // ugly but good, case sensitive...
        Cell: props => (
          <span
            onClick={() => {
              this.togglePopup(props.original);
            }}
          >
            {props.original.name}
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
            {props.original.assignedOpponents.length}
            </span>
          </Link>
        )
      }
    ];

    return (
      <div>
        <ReactTable 
          data={this.state.initialReports} 
          pages={this.state.pages}
          loading={this.state.loading}
          manual // ??
          onFetchData={async (state, instance) => {
            this.setState({ loading: true });
            const initialReports = await func.getInitialReports();

            this.setState({
              initialReports: initialReports,
              pages: 1,
              loading: false
            });
          }}
          columns={columns}  
           />{" "}
        {this.state.showPopup ? (
          <ReportPopup
            report={this.state.selectedReport}
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
