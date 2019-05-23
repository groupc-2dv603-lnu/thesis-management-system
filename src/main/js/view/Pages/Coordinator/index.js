"use strict";

import React, { Component } from "react";
import CorNav from "./CorNav";
import Submissions from '../Coordinator/Submissions/Submissions'
import Students from '../Coordinator/Students/Students'
import Reports from '../Coordinator/Reports/Reports'
import * as Style from './Styles'

class Coordinator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "submissions"
    };
    console.log("propsIndex", this.props);
    console.log("stateIndex", this.state);
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(page) {
    console.log(page)
    this.setState({ page: page });
  }

  renderPage() {
    if(this.state.page === 'submissions') {
      return <Submissions></Submissions>
    } else if (this.state.page === 'students') {
      return <Students></Students>
    } else if (this.state.page === 'reports') {
      return <Reports></Reports>
    }
  }
  render() {
    return (
      <div style={Style.body}>
        <CorNav
          handleChange={this.handleChange}
          key={this.state.page}
          page={this.state.page}
        />
        {this.renderPage()}
      </div>
      
    );
  }
}

export default Coordinator;
