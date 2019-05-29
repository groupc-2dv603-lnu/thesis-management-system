// TODO
// separera css-fil - eller ha alla styles som konstanter i js-filerna
// implementera db-hämtning
// sidan renderas inte om efter supervisor request
// hur få hela addressen till filen vid uppladdning?

'use strict';

import React, { Component } from 'react';
import SupervisorBox from './supervisor';
import Submission from './submission';
import * as common from './../../functions'

// import * as func from './functions'; // temp

class Student extends Component {
    constructor(props) {
        super(props);

        this.state = { submissions: [] };
    }

    componentDidMount() {

        const reportCalls = ["projectDescription", "projectPlan", "initialReport", "finalReport"];

        let reports = new Array(4);
        let count = 0;

        for(let i = 0; i < reportCalls.length; i ++) {
            common.getFromAPI("/student/" + reportCalls[i]).then(report => {
                // console.log(report)
                // func.getSubmissionData(report.entity.submissionId).then(submission => {
                    // let submission = {} // temp testData
                    // console.log(submission)
                    reports[i] = <Submission key={reportCalls[i]} reportData={report.entity} type={reportCalls[i]} />
                    // submissionData={submission.entity}/>
                // })
            })
            .then(() => {
                count ++;
                if(count == 4) {
                    this.setState({ submissions: reports });
                }
            })
        };
    }

    render() {        
        return (
            <div>
                <SupervisorBox />

                <h2>Thesis Submissions</h2>
                {this.state.submissions}

                {/* file upload test */}
                {/* <input type="file" id="file"/>
                <button onClick={() => func.uploadFile(document.getElementById("file").files[0])}>Upload</button> */}
                
            </div>
        )
    }

}

export default Student