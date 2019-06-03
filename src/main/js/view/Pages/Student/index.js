'use strict';

import React, { Component } from 'react';
import SupervisorBox from './supervisor';
import Submission from './submission';
import './style.css';

class Student extends Component {
    constructor(props) {
        super(props);

        this.state = { submissions: [] };
    }

    componentDidMount() {
        const reportCalls = ["projectDescription", "projectPlan", "initialReport", "finalReport"];

        let tempSubmissions = [];
        reportCalls.forEach(reportCall => {
            tempSubmissions.push(<Submission key={reportCall} type={reportCall} />);
        })
        this.setState({ submissions: tempSubmissions})
    }

    render() {
        return (
            <div>
                <SupervisorBox />

                <h2>Thesis Submissions</h2>
                {this.state.submissions}
            </div>
        )
    }

}

export default Student