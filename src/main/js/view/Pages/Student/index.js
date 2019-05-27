// TODO
// separera css-fil - eller ha alla styles som konstanter i js-filerna
// implementera db-hämtning

'use strict';

import React, { Component } from 'react';
import SupervisorBox from './supervisor';
import Submission from './submission';
import * as func from './functions'

class Student extends Component {
    constructor(props) {
        super(props);

        // this.state = { PDData: {}, PPData: {}, IRData: {}, FRData: {}, PDSubmissionData: {}, PPSubmissionData: {}, IRSubmissionData: {}, FRSubmissionData: {} ];
        this.state = { submissions: [], render: false };
    }

    componentDidMount() {

        const reportCalls = ["projectDescription", "projectPlan", "initialReport", "finalReport"];

        let reports = new Array(4);
        let count = 0;

        // reportCalls.forEach(call => {

        for(let i = 0; i < reportCalls.length; i ++) {
            func.getFromAPI("/student/" + reportCalls[i]).then(report => {
                // func.getSubmissionData(report.entity.submissionId).then(submission => {
                    let submission = {} // temp testData
                    reports[i] = <Submission key={reportCalls[i]} documentData={report.entity} type={reportCalls[i]} submissionData={submission.entity}/>
                // })
            })
            .then(() => {
                count ++;
                if(count == 4) {
                    this.setState({ submissions: reports });
                }
            })
        };

        // func.getFromAPI("/student/projectDescription").then(documentResponse => {
        //     if(documentResponse.entity) {
        //         func.getSubmissionData(documentResponse.entity.submissionId).then(submission => {
        //             // this.submissions.push(
        //             //     <Submission key={documentResponse.entity.id} documentData={documentResponse.entity} submissionData={submission} type="Test document"/>
        //             // );
        //             this.setState({ PDData: documentResponse.entity, PDSubmissionData: submission }); //.entity
        //         });
        //     }
        // })
        // func.getFromAPI("/student/projectPlan").then(documentResponse => {
        //     if(documentResponse.entity) {
        //         func.getSubmissionData(documentResponse.entity.submissionId).then(submission => {
        //             this.setState({ PPData: documentResponse.entity, PPSubmissionData: submission }); //.entity
        //         });
        //     }
        // })
        // func.getFromAPI("/student/initialReport").then(documentResponse => {
        //     if(documentResponse.entity) {
        //         func.getSubmissionData(documentResponse.entity.submissionId).then(submission => {
        //             this.setState({ IRData: documentResponse.entity, IRSubmissionData: submission }); //.entity
        //         });
        //     }
        // })
        // func.getFromAPI("/student/finalReport").then(documentResponse => {
        //     if(documentResponse.entity) {
        //         func.getSubmissionData(documentResponse.entity.submissionId).then(submission => {
        //             this.setState({ FRData: documentResponse.entity, FRSubmissionData: submission }); //.entity
        //         });
        //     }
        // })
    }

    render() {        
        return (
            <div>
                <SupervisorBox />

                <h2>Thesis Submissions</h2>
                {this.state.submissions}
                {/*
                <Submission documentData={this.state.PDData} submissionData={this.state.PDSubmissionData} type="Project Description"/>
                <Submission documentData={this.state.PPData} submissionData={this.state.PPSubmissionData} type="Project Plan"/>
                <Submission documentData={this.state.IRData} submissionData={this.state.IRSubmissionData} type="Initial Report"/>
                <Submission documentData={this.state.FRData} submissionData={this.state.FRSubmissionData} type="Final Report"/>
                */}
               
            </div>
        )
    }

}

export default Student