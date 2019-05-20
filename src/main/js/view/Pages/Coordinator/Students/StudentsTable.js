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
import { Link } from "react-router-dom";
import RCTooltip from "rc-tooltip";
import * as Style from "../Styles"
const client = require("../../../../client");


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
      fTooltip: false
    };
  }

  componentDidMount() {
    client({ method: "GET", path: "/users" }).then(response => {
      // removes users with roles: null. Dev purpose
      const students = response.entity._embedded.users.filter(
        student => student.roles !== null
      );
      const stu = [];
      students.forEach(student => {
        student.roles.forEach(role => {
          role === "STUDENT" ? stu.push(student) : null;
        });
      });
      this.setState({ students: stu });
    });
  }

  render() {
    /* ---- Table ---- */
    const columnMaxWidth = 60;
    const columns = [
      {
        Header: "Name",
        headerStyle: Style.headerNameCellStyle,
        style: Style.nameColumnStyle,
        accessor: "name",
        resizable: true,
        filterable: false, // ugly but good, case sensitive...
        Cell: props => (
          <Link to={`#`}>
            <span style={Style.nameColumnStyle}>{props.value}</span>
          </Link>
        )
      },
      {
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
          <Link to={`#`}>
            <span style={Style.nameColumnStyle}>y</span>
          </Link>
        )
      },
      {
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
            overlay={<span style={Style.tooltip}>Submitted project description</span>}
          >
            <span>D</span>
          </RCTooltip>
        ),
        accessor: "description",
        headerStyle: Style.headerSubmissionStyle,
        style: Style.submissionColumnStyle,
        maxWidth: columnMaxWidth,
        Cell: props => (
          <Link to="#">
            <span>x</span>
          </Link>
        )
      },
      {
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
          <Link to="#">
            <span>x</span>
          </Link>
        )
      },
      {
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
            overlay={<span style={Style.tooltip}>Submitted initial report</span>}
          >
            <span>I</span>
          </RCTooltip>
        ),
        accessor: "initial",
        headerStyle: Style.headerSubmissionStyle,
        style: Style.submissionColumnStyle,
        maxWidth: columnMaxWidth,
        Cell: props => (
          <Link to="#">
            <span>x</span>
          </Link>
        )
      },
      {
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
          <Link to="#">
            <span>x</span>
          </Link>
        )
      }
    ];

    return <ReactTable data={this.state.students} columns={columns} />;
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
