// TODO
// view feedback

'use strict';

import React, { Component } from 'react';
import SupervisorBox from './supervisor';
import StudentMocks from './mocks';
import Submission from './submission'

class Student extends Component {
    constructor(props) {
        super(props);

        this.studentData = new StudentMocks();
    }

    // componentDidMount() {
    //     client({ method: 'GET', path: '/users' }).then(response => {
    //         this.setState({ users: response.entity._embedded.users });
    //     });
    // }

    render() {
        return (
            <div>
                <SupervisorBox {...this.studentData} />

                <h2>Thesis Submissions</h2>
                <Submission {...this.studentData.projectDescription} />
                <Submission {...this.studentData.projectPlan} />
                <Submission {...this.studentData.initialReport} />
                <Submission {...this.studentData.finalReport} />
            </div>
        )
    }

}

export default Student