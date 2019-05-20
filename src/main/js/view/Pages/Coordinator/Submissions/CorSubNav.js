import React, { Component } from "react";
import { Link } from "react-router-dom";

/**
 * Subnav for coordinator page
 * TODO:
 *  - 
 */

class CorSubNav extends Component {
  render() {
    return (
      <div style={divStyle}>
        <button style={btnStyle}>
          <Link style={linkStyle} to="#" replace>
            Create?
          </Link>
        </button>
        <button style={btnStyle}>
          <Link style={linkStyle} to="#" replace>
            Description
          </Link>
        </button>
        <button style={btnStyle}>
          <Link style={linkStyle} to="#" replace>
            Plan
          </Link>
        </button>
        <button style={btnStyle}>
          <Link style={linkStyle} to="#" replace>
            Initial Report
          </Link>
        </button>
        <button style={btnStyle}>
          <Link style={linkStyle} to="#" replace>
            Final Report
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

export default CorSubNav