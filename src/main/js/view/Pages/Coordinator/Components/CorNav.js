import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class CorNav extends Component {

render() {
  return (
    <div style={navStyle}>
      <Link style={linkStyle} to="/coordinator/corSubmissions" replace>Submissions</Link>
      <Link style={linkStyle} to="/coordinator/corStudents" replace>Students</Link>
      <Link style={linkStyle} to="/coordinator/corReports" replace>Reports</Link>
    </div>
    )
  }
}

const navStyle = {
  width: '600px',
  marginTop: '-15px'
}

const linkStyle = {
  marginRight: '25%',
  fontWeight: 'bold'
}
export default CorNav;