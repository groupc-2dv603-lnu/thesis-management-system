import React, { Component } from "react";
import ReactTable from "react-table";
import StudentPopup from "./StudentPopup";
import * as Style from "../Styles/Styles";
import * as TableStyle from "../Styles/TableStyles";
import * as func from "./studentFunctions/studentFunctions";

class StudentsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      loading: true,
      selectedStudent: null,
      assignedSupervisorName: null
    };
  }

  async togglePopup(student) {
    this.setState({ 
      selectedStudent: student,
      assignedSupervisorName: student.assignedSupervisorId !== "" ? await func.getName(student.assignedSupervisorId) : null  
     });
    this.setState({ showPopup: !this.state.showPopup });
  }

  render() {
    /* ---- Table ---- */
    const columnMaxWidth = 60;

    const columns = [
      {
        /* ----- TABLE NAME ----- */
        Header: "Name",
        sortable: true,
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
          
          <span>{func.booleanSymbol(props.original.assignedSupervisorId !== "")}</span>
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
            {props.original.projectDescription !== undefined ? func.booleanSymbol(props.original.projectDescription.fileUrl !== "") : func.booleanSymbol(false)}
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
          <span>
            {props.original.projectPlan !== undefined ? func.booleanSymbol(props.original.projectPlan.fileUrl !== "") : func.booleanSymbol(false)}
          </span>
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
            {props.original.initialReport !== undefined ? func.booleanSymbol(props.original.initialReport.fileUrl !== "") : func.booleanSymbol(false)}
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
          <span>
          {props.original.finalReport !== undefined ? func.booleanSymbol(props.original.finalReport.fileUrl !== "") : func.booleanSymbol(false)}
         </span>
        )
      }
    ];

    return (
      <div style={Style.dropDownBody}>
        <ReactTable
          data={this.state.students}
          pages={this.state.pages}
          loading={this.state.loading}
          showPagination={false}
          minRows={0}
          sortable={false}
          resizable={false}
          onFetchData={async (state, instance) => {
            this.setState({ loading: true });
            const students = await func.getStudentTableData();

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
            assignedSupervisorName={this.state.assignedSupervisorName}
            closePopup={this.togglePopup.bind(this)}
          />
        ) : null}
      </div>
    );
  }
}




export default StudentsTable;
