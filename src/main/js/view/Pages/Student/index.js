// TODO
// design för icke tillgänglig data
// separera css-fil - eller ha alla styles som konstanter i js-filerna
// implementera db-hämtning

'use strict';

import React, { Component } from 'react';
import SupervisorBox from './supervisor';
import Submission from './submission';
import { getPDData, getPPData, getIRData, getFRData, getSubmissionData } from './functions'

class Student extends Component {
    constructor(props) {
        super(props);

        this.state = { PDData: {}, PPData: {}, IRData: {}, FRData: {}, PDSubmissionData: {}, PPSubmissionData: {}, IRSubmissionData: {}, FRSubmissionData: {} }
    }

    componentDidMount() { // TODO (low importance) state should only be set once to avoid multiple re-renders (performance issue)
        // let reportCalls = [ getPDData(), getPPData(), getIRData(), getFRData() ];
        // let reportData = [ "PDData", "PPData", "IRData", "FRData" ];
        // let submissionData = [ this.state.PDSubmissionData, this.state.PPSubmissionData, this.state.IRSubmissionData, this.state.FRSubmissionData ];

        // // reportCalls.forEach(reportCall => {
        // for(let i = 0; i < 4; i ++) {
        //     reportCalls[i].then(response => {
        //         getSubmissionData(response.entity.submissionId).then(submission => {
        //             this.setState({ reportData[i]: response.entity, submissionData[i]: submission });
        //         });
        // })

        // for(let i = 0; i < 4; i ++) {
        //     getPDData().then(response => {
        //         getSubmissionData(response.entity.submissionId).then(submission => {
        //             this.setState({ PDData: response.entity, PDSubmissionData: submission }); //.entity
        //         });
        //     })
        // }

        getPDData().then(response => {
            if(response.entity) {
                getSubmissionData(response.entity.submissionId).then(submission => {
                    this.setState({ PDData: response.entity, PDSubmissionData: submission }); //.entity
                });
            }
        })
        getPPData().then(response => {
            if(response.entity) {
                   getSubmissionData(response.entity.submissionId).then(submission => {
                    this.setState({ PPData: response.entity, PPSubmissionData: submission }); //.entity
                });
            }
        })
        getIRData().then(response => {
            if(response.entity) {
                getSubmissionData(response.entity.submissionId).then(submission => {
                    this.setState({ IRData: response.entity, IRSubmissionData: submission }); //.entity
                });
            }
        })
        getFRData().then(response => {
            if(response.entity) {
                getSubmissionData(response.entity.submissionId).then(submission => {
                    this.setState({ FRData: response.entity, FRSubmissionData: submission }); //.entity
                });
            }
        })
    }

    render() {
        return (
            <div>
                <SupervisorBox />

                <h2>Thesis Submissions</h2>
                <Submission reportData={this.state.PDData} submissionData={this.state.PDSubmissionData} type="Project Description"/>
                <Submission reportData={this.state.PPData} submissionData={this.state.PPSubmissionData} type="Project Plan"/>
                <Submission reportData={this.state.IRData} submissionData={this.state.IRSubmissionData} type="Initial Report"/>
                <Submission reportData={this.state.FRData} submissionData={this.state.FRSubmissionData} type="Final Report"/>
                {/*
                */}
                

                {/* Only construct components when data has been fetched */}
                {/*
                {this.state.PDData ? <Submission reportData={this.state.PDData} type={reportType.PD}/> : null }
                {this.state.PPData ? <Submission reportData={this.state.PPData} type={reportType.PP}/> : null }
                {this.state.IRData ? <Submission reportData={this.state.IRData} type={reportType.IR}/> : null }
                {this.state.FRData ? <Submission reportData={this.state.FRData} type={reportType.FR}/> : null } 
                */}
               
            </div>
        )
    }

}

export default Student