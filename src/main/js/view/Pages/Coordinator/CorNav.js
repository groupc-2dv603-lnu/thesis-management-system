import React, { Component } from "react";
import * as Style from './Styles'

class CorNav extends Component {
  constructor(props) {
    super(props);
    console.log('propsNav', this.props)
  }

  setPage(page) {
    console.log(page)

  }

  render() {
    return (
      <div style={Style.navButtonsDiv}>
        <button onClick={() => this.props.handleChange('submissions')} style={Style.btnStyle}>
            Submissions
        </button>
        <button onClick={() => this.props.handleChange('students')} style={Style.btnStyle}>
            Students
        </button>
        <button onClick={() => this.props.handleChange('reports')} style={Style.btnStyle}>
            Reports
        </button>
      </div>
    );
  }
}



export default CorNav;
