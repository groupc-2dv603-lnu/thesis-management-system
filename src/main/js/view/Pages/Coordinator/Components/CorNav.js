import React, { Component } from "react";
import { Link } from "react-router-dom";

/**
 * Navigation for Coordinator page
 * Todo:
 *  - styling
 */
class CorNav extends Component {
  render() {
    return (
      <div style={divStyle}>
        <button style={btnStyle}>
          <Link style={linkStyle} to="/coordinator/submissions" replace>
            Submissions
          </Link>
        </button>
        <button style={btnStyle}>
          <Link style={linkStyle} to="/coordinator/students" replace>
            Students
          </Link>
        </button>
        <button style={btnStyle}>
          <Link style={linkStyle} to="/coordinator/reports" replace>
            Reports
          </Link>
        </button>
      </div>
    );
  }
}

const backgroundColor = '#ffe000'

const divStyle = {
  width: "600px",
  textAlign: 'center',
  marginTop: '-20px',
  background: backgroundColor,
  border: '1px solid black',
  borderTop: 0
};

const linkStyle = {
  fontWeight: "bold",
  width: '100%',
  textAlign: 'center',
  color: 'black'
};

const btnStyle = {
  height: '40px',
  width: '120px',
  background: backgroundColor,
  display: 'inline-block',
  border: '1px solid black',
  borderTop: 0,
  borderBottom: 0
}

export default CorNav;