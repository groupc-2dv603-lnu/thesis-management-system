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
import * as TableStyle from "../Styles/TableStyles";
import * as func from "../func";

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
      selectedStudent: null,
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
        Header: () => (
          <RCTooltip
            onMouseEnter={() =>
              this.setState({ sTooltip: !this.state.sTooltip })
            }
            onMouseLeave={() =>
              this.setState({ sTooltip: !this.state.sTooltip })
            }
            visible={!this.state.sTooltip ? false : true}
            placement="top"
            trigger={["hover"]}
            overlay={
              <span style={TableStyle.tooltip}>Assigned supervisor</span>
            }
          >
            <span>S</span>
          </RCTooltip>
        ),
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
        Header: () => (
          <RCTooltip
            onMouseEnter={() =>
              this.setState({ dTooltip: !this.state.dTooltip })
            }
            onMouseLeave={() =>
              this.setState({ dTooltip: !this.state.dTooltip })
            }
            visible={!this.state.dTooltip ? false : true}
            placement="top"
            trigger={["hover"]}
            overlay={
              <span style={TableStyle.tooltip}>
                Submitted project description
              </span>
            }
          >
            <span>D</span>
          </RCTooltip>
        ),
        accessor: "description",
        headerStyle: TableStyle.headerSubmissionStyle,
        style: TableStyle.submissionColumnStyle,
        maxWidth: columnMaxWidth,
        Cell: props => <span>Y</span>
      },
      {
        /* ----- PROJECT PLAN ----- */
        Header: () => (
          <RCTooltip
            onMouseEnter={() =>
              this.setState({ pTooltip: !this.state.pTooltip })
            }
            onMouseLeave={() =>
              this.setState({ pTooltip: !this.state.pTooltip })
            }
            visible={!this.state.pTooltip ? false : true}
            placement="top"
            trigger={["hover"]}
            overlay={
              <span style={TableStyle.tooltip}>Submitted project plan</span>
            }
          >
            <span>P</span>
          </RCTooltip>
        ),
        accessor: "plan",
        headerStyle: TableStyle.headerSubmissionStyle,
        style: TableStyle.submissionColumnStyle,
        maxWidth: columnMaxWidth,
        Cell: props => <span>y</span>
      },
      {
        /* ----- INITIAL REPORT ----- */
        Header: () => (
          <RCTooltip
            onMouseEnter={() =>
              this.setState({ iTooltip: !this.state.iTooltip })
            }
            onMouseLeave={() =>
              this.setState({ iTooltip: !this.state.iTooltip })
            }
            visible={!this.state.iTooltip ? false : true}
            placement="top"
            trigger={["hover"]}
            overlay={
              <span style={TableStyle.tooltip}>Submitted initial report</span>
            }
          >
            <span>I</span>
          </RCTooltip>
        ),
        accessor: "initial",
        headerStyle: TableStyle.headerSubmissionStyle,
        style: TableStyle.submissionColumnStyle,
        maxWidth: columnMaxWidth,
        Cell: props => <span>y</span>
      },
      {
        /* ----- FINAL REPORT ----- */
        Header: () => (
          <RCTooltip
            onMouseEnter={() =>
              this.setState({ fTooltip: !this.state.fTooltip })
            }
            onMouseLeave={() =>
              this.setState({ fTooltip: !this.state.fTooltip })
            }
            visible={!this.state.fTooltip ? false : true}
            placement="top"
            trigger={["hover"]}
            overlay={
              <span style={TableStyle.tooltip}>Submitted final report</span>
            }
          >
            <div>F</div>
          </RCTooltip>
        ),
        accessor: "final",
        headerStyle: TableStyle.headerSubmissionStyle,
        style: TableStyle.submissionColumnStyle,
        maxWidth: columnMaxWidth,
        Cell: props => <span>y</span>
      }
    ];

    return (
      <div>
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
