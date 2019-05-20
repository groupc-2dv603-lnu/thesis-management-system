/**
 * TODO
 *  - Add links to studentpage and submissions
 *  - Show if assigned supervisor: bool
 */
import React, { Component } from 'react'
import ReactTable from 'react-table'
import { ReactTableDefaults } from 'react-table'
import { Link } from 'react-router-dom'

const client = require ('../../../../client');

class StudentsTable extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      students: [] 
    };
}

 componentDidMount() {
  client({ method: 'GET', path: '/users' }).then(response => {
      // removes users with roles: null. Dev purpose
      const students = response.entity._embedded.users.filter(student => student.roles !== null) 
      const stu = []
      students.forEach(student => {
        student.roles.forEach(role => {
          role === 'STUDENT' ? stu.push(student) : null
        })
      })
      this.setState({ students: stu });
  })
}

render() {
  /* ---- Table ---- */
  const columns = [
    {
    Header: 'Name',
    headerStyle: headerNameCellStyle,
    style: nameColumnStyle,
    accessor: 'name',
    resizable: true,
    filterable: false, // ugly but good, case sensitive...
    Cell: props => <Link to={`#`}><span style={nameColumnStyle}>{props.value}</span></Link>
  }, {
    Header: 'Description',
    accessor: 'emailAdress',
    headerStyle: headerSubmissionStyle,
    style: submissionColumnStyle,
    Cell: props => <Link to="#"><span>x</span></Link>
  }, {
    Header: 'Plan',
    accessor: 'emailAdress',
    headerStyle: headerSubmissionStyle,
    style: submissionColumnStyle,
    Cell: props => <Link to="#"><span>x</span></Link>
  }, {
    Header: 'Initial',
    accessor: 'emailAdress',
    headerStyle: headerSubmissionStyle,
    style: submissionColumnStyle,
    Cell: props => <Link to="#"><span>x</span></Link>
  }, {
    Header: 'Final',
    accessor: 'emailAdress',
    headerStyle: headerSubmissionStyle,
    style: submissionColumnStyle,
    Cell: props => <Link to="#"><span>x</span></Link>
  }
]

  return <ReactTable
      data={this.state.students}
      columns={columns}
      />
  }
}

/* ---- Table configs ---- */
Object.assign(ReactTableDefaults, {
  defaultPageSize: 25,
  minRows: 0,
  showPagination: true,
  resizable: false,
  showPageSizeOptions: false,
})

  /* ---- TABLE STYLING ---- */
  const headerBackgroundColor = '#ffe000'
  const headerFontColor = 'black'
  const headerFontWeight = 'bold'
  const nameColumnMinWidth = '33%'
  const submissionColumnMaxWidth = '15%'
  const headerRowHeight = 40
  const lineHeight = 2


  const headerNameCellStyle = {
    minWidth: nameColumnMinWidth,
    background: headerBackgroundColor,
    color: headerFontColor,
    fontWeight: headerFontWeight,
    height: headerRowHeight,
    lineHeight: lineHeight,
    border: '1px solid black'
  }

  const headerSubmissionStyle = {
    background: headerBackgroundColor,
    color: headerFontColor,
    fontWeight: headerFontWeight,
    height: headerRowHeight,
    maxWidth: submissionColumnMaxWidth,
    lineHeight: lineHeight,
    border: '1px solid black'
  }

  const nameColumnStyle = {
    minWidth: nameColumnMinWidth,
    width: nameColumnMinWidth
  }

  const submissionColumnStyle = {
    maxWidth: submissionColumnMaxWidth,
    width: '100%',
    textAlign: 'center',
  }
 
export default StudentsTable