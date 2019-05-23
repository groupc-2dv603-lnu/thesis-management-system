/**
 * TODO
 *  - Add links to studentpage and submissions
 *  - Add supervisorName if assigned
 *  - Fix tooltipBug, doesnt disappear after mouseLeave
 *  - Fix tooltipstyling, width 100% expands over whole page
 */
import React, { Component } from "react";
import ReactTable from "react-table";
import { ReactTableDefaults } from "react-table";
import RCTooltip from "rc-tooltip";
import StudentPopup from "./StudentPopup";
import * as Style from "../Styles";
const client = require("../../../../client");

/* ---- function imports ---- */
import {
  getStudents,
  getName,
  submissionSubmitted,
  supervisorAssigned,
  submittedTrue,
  submittedFalse,
  descriptionSubmitted
} from "../functions";

class StudentsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      // tooltips for headerColumns
      sTooltip: false,
      dTooltip: false,
      pTooltip: false,
      iTooltip: false,
      fTooltip: false,
      // sent to studentPopup
      selectedUserId: null,
      showPopup: false
    };
    this.state.students = getStudents();
  }

  togglePopup(userId) {
    this.setState({
      selectedUserId: userId
    });
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    /* ---- Table ---- */
    const columnMaxWidth = 60;
    const projectDescription = 'project description'
    const projectPlan = 'project plan'
    const initialReport = 'initial report'
    const finalReport = 'final report'

    const columns = [
      {
        /* ----- TABLE NAME ----- */
        Header: "Name",
        headerStyle: Style.headerNameCellStyle,
        style: Style.nameColumnStyle,
        accessor: "name",
        resizable: true,
        filterable: false, // ugly but good, case sensitive...
        Cell: props => (
          <span
            onClick={() => {
              this.togglePopup(props.original.id);
            }}
          >
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
            overlay={<span style={Style.tooltip}>Assigned supervisor</span>}
          >
            <span>S</span>
          </RCTooltip>
        ),
        headerStyle: Style.headerSubmissionStyle,
        style: Style.submissionColumnStyle,
        accessor: "supervisor",
        maxWidth: columnMaxWidth,
        Cell: props => (
          <span>
            {supervisorAssigned() === true ? submittedTrue() : submittedFalse()}
          </span>
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
              <span style={Style.tooltip}>Submitted project description</span>
            }
          >
            <span>D</span>
          </RCTooltip>
        ),
        accessor: "description",
        headerStyle: Style.headerSubmissionStyle,
        style: Style.submissionColumnStyle,
        maxWidth: columnMaxWidth,
        Cell: props => (
          <span>
            {submissionSubmitted(props.original.id, projectDescription) ===
            true
              ? submittedTrue()
              : submittedFalse()}
          </span>
        )
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
            overlay={<span style={Style.tooltip}>Submitted project plan</span>}
          >
            <span>P</span>
          </RCTooltip>
        ),
        accessor: "plan",
        headerStyle: Style.headerSubmissionStyle,
        style: Style.submissionColumnStyle,
        maxWidth: columnMaxWidth,
        Cell: props => (
          <span>
            {submissionSubmitted(props.original.id, projectPlan) ===
            true
              ? submittedTrue()
              : submittedFalse()}
          </span>
        )
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
              <span style={Style.tooltip}>Submitted initial report</span>
            }
          >
            <span>I</span>
          </RCTooltip>
        ),
        accessor: "initial",
        headerStyle: Style.headerSubmissionStyle,
        style: Style.submissionColumnStyle,
        maxWidth: columnMaxWidth,
        Cell: props => (
          <span>
            {submissionSubmitted(props.original.id, initialReport) ===
            true
              ? submittedTrue()
              : submittedFalse()}
          </span>
        )
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
            overlay={<span style={Style.tooltip}>Submitted final report</span>}
          >
            <div>F</div>
          </RCTooltip>
        ),
        accessor: "final",
        headerStyle: Style.headerSubmissionStyle,
        style: Style.submissionColumnStyle,
        maxWidth: columnMaxWidth,
        Cell: props => (
          <span>
            {submissionSubmitted(props.original.id, finalReport) ===
            true
              ? submittedTrue()
              : submittedFalse()}
          </span>
        )
      }
    ];

    return (
      <div>
        <ReactTable data={this.state.students} columns={columns} />
        {this.state.showPopup ? (
          <StudentPopup
            userId={this.state.selectedUserId}
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
