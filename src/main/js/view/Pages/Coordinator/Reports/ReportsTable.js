import React, { Component } from "react";
import ReactTable from "react-table";
import { ReactTableDefaults } from "react-table";
import { Link } from "react-router-dom";
import * as Style from "../Styles/TableStyles";
import ReportPopup from "./ReportPopup";


const client = require("../../../../client");

class ReportsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      initialReports: [],
      selectedReportId: null,
      showPopup: false,
      loading: false,
      // pages: -1,
    };
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
            Name
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
            <span>Antal</span>
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
            <span>Antal/namn?</span>
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
              antal/namn?
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
            console.log('tableState', state)
            this.setState({ loading: true });
            //const initialReports = await func.getAllStudents();

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
