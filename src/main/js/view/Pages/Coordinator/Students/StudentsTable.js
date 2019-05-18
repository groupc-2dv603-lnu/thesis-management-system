/**
 * TODO
 *  - 
 *  - 
 */
import React, { Component } from 'react'
import ReactTable from 'react-table'
import { ReactTableDefaults } from 'react-table'
import { Link } from 'react-router-dom'

const client = require ('../../../../client');

class StudentsTable extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
}

componentDidMount() {
  client({ method: 'GET', path: '/users' }).then(response => {
      this.setState({ users: response.entity._embedded.users });
  });
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
    filterable: false, // ugly but good. ???
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
      data={this.state.users}
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
  const headerBackgroundColor = 'grey'
  const headerFontColor = 'white'
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
  }

  const headerSubmissionStyle = {
    background: headerBackgroundColor,
    color: headerFontColor,
    fontWeight: headerFontWeight,
    height: headerRowHeight,
    maxWidth: submissionColumnMaxWidth,
    lineHeight: lineHeight,
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