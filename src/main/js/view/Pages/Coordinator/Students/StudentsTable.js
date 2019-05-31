/**
 * TODO
 *  - needs GET all students (using mock)
 *  - Add supervisorName if assigned
 *  - Fix tooltipBug, doesnt disappear after mouseLeave
 *  - Fix tooltipstyling, width 100% expands over whole page
 */

import React, { Component } from "react";
import ReactTable from "react-table";
import { ReactTableDefaults } from "react-table";
import RCTooltip from "rc-tooltip";
import StudentPopup from "./StudentPopup";
import * as Style from "../Styles/Styles";
import * as TableStyle from "../Styles/TableStyles";
import * as func from "./studentFunctions/studentFunctions";

class StudentsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sTooltip: false,
      dTooltip: false,
      pTooltip: false,
      iTooltip: false,
      fTooltip: false,
      showPopup: false,
      students: [],
      loading: true,
      selectedStudent: null
      // pages: -1
    };
  }

  togglePopup(student) {
    this.setState({ selectedStudent: student });
    this.setState({ showPopup: !this.state.showPopup });
  }

  render() {
    /* ---- Table ---- */
    const columnMaxWidth = 60;
    const projectDescription = "project description";
    const projectPlan = "project plan";
    const initialReport = "initial report";
    const finalReport = "final report";

    const columns = [
      {
        /* ----- TABLE NAME ----- */
        Header: "Name",
        headerStyle: TableStyle.headerNameCellStyle,
        style: TableStyle.nameColumnStyle,
        accessor: "name",
        resizable: true,
        filterable: false, // ugly but good, case sensitive...
        Cell: props => (
          <span onClick={() => this.togglePopup(props.original)}>
            {props.original.name}
          </span>
        )
      },
      {
        /* ----- ASSIGNED SUPERVISOR ----- */
        Header: () => <span>S</span>,
        headerStyle: TableStyle.headerSubmissionStyle,
        style: TableStyle.submissionColumnStyle,
        accessor: "supervisor",
        maxWidth: columnMaxWidth,
        Cell: props => (
          <span>{func.booleanSymbol(props.original.supervisorAssigned)}</span>
        )
      },
      {
        /* ----- PROJECT DESCRIPTION ----- */
        Header: () => <span>D</span>,
        accessor: "description",
        headerStyle: TableStyle.headerSubmissionStyle,
        style: TableStyle.submissionColumnStyle,
        maxWidth: columnMaxWidth,
        Cell: props => (
          <span>
            {func.booleanSymbol(props.original.projectDescriptionSubmitted)}
          </span>
        )
      },
      {
        /* ----- PROJECT PLAN ----- */
        Header: () => <span>P</span>,
        accessor: "plan",
        headerStyle: TableStyle.headerSubmissionStyle,
        style: TableStyle.submissionColumnStyle,
        maxWidth: columnMaxWidth,
        Cell: props => (
          <span>{func.booleanSymbol(props.original.projectPlanSubmitted)}</span>
        )
      },
      {
        /* ----- INITIAL REPORT ----- */
        Header: () => <span>I</span>,
        accessor: "initial",
        headerStyle: TableStyle.headerSubmissionStyle,
        style: TableStyle.submissionColumnStyle,
        maxWidth: columnMaxWidth,
        Cell: props => (
          <span>
            {func.booleanSymbol(props.original.initialReportSubmitted)}
          </span>
        )
      },
      {
        /* ----- FINAL REPORT ----- */
        Header: () => <div>F</div>,
        accessor: "final",
        headerStyle: TableStyle.headerSubmissionStyle,
        style: TableStyle.submissionColumnStyle,
        maxWidth: columnMaxWidth,
        Cell: props => (
          <span>{func.booleanSymbol(props.original.finalReportSubmitted)}</span>
        )
      }
    ];

    return (
      <div style={Style.dropDownBody}>
        <ReactTable
          data={this.state.students}
          pages={this.state.pages}
          loading={this.state.loading}
          manual // ??
          onFetchData={async (state, instance) => {
            // console.log('tableState', state)
            this.setState({ loading: true });
            const students = await func.getAllStudents();

            this.setState({
              students: students,
              pages: 1,
              loading: false
            });
          }}
          columns={columns}
        />
        {this.state.showPopup ? (
          <StudentPopup
            student={this.state.selectedStudent}
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

export default StudentsTable;
