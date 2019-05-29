'use strict'

import React, { Component } from 'react';
import * as func from './functions';
import { capitalizeFirstLetter } from './../../functions';

// const submissionStatus = { ACTIVE: "ACTIVE", FINISHED: "FINISHED", DISABLED: "DISABLED" };
const grades = { NOGRADE: "NOGRADE", PASS: "PASS", FAIL: "FAIL" };
const dbType = new Map([ ["projectDescription", "PRJ_DESCRIPTION"], ["projectPlan", "PRJ_PLAN"], ["initialReport", "INITIAL_REPORT"], ["finalReport", "FINAL_REPORT"] ]); //hopefully temporary

class Submission extends Component {

    constructor(props) {
        super(props);
        this.state = { showFeedback: false, submissionData: {} };

        this.toggleShowFeedback = this.toggleShowFeedback.bind(this);
    }

    componentDidMount() {
        // console.log(this.props.type, this.props.reportData.submissionId)
        this.updateSubmissionData();
    }

    sendFile() {
        
        func.uploadFile(document.getElementById("file").files[0], this.props.reportData.userId, dbType.get(this.props.type))
        // .then(() => {
            // this.updateSubmissionData();
            // document.getElementById("file").value = "";
        // })
        .catch(() => {
            this.updateSubmissionData();
        })      
    }

    updateSubmissionData() {
        if(this.props.reportData.submissionId) { // the report will only have a submission tied to it if a file has been uploaded
            console.log("updating submission data")
            func.getSubmissionData(this.props.reportData.submissionId).then(response => {
                // console.log(response.entity)
                this.setState({ submissionData: response.entity })
            })
        }
    }

    toggleShowFeedback() {
        this.setState({ showFeedback: !this.state.showFeedback });
    }

    render() {
        let line1, line2, styleClass;
        
        let currentDate = new Date().toISOString(); // TODO get date from server
      
        // submission graded
        if(this.props.reportData.grade != grades.NOGRADE) {
        // if(this.props.submissionData && this.props.submissionData.submissionStatus == submissionStatus.FINISHED) {
            line1 = "Status: Graded";
            line2 = "Grade: " + func.capitalizeFirstLetter(this.props.reportData.grade);
            styleClass = "finished";
        }
        // deadline is set (but not graded) == submission counted as active
        else if(this.props.reportData.deadLine) {
            line1 = "Status: " + (this.state.submissionData && this.state.submissionData.fileUrl ? "Submitted" : "Not submitted");
            line2 = "Deadline: " + new Date(this.props.reportData.deadLine).toUTCString();
            styleClass = "active";
        }
        else {
            line1 = "N/A"
            styleClass = "disabled";
        }

        return (
            <div>
                <div className={"submission " + styleClass}>
                    <div className="header" onClick={() => this.toggleShowFeedback()}>{func.capitalizeFirstLetter(this.props.type)}</div>
                    <div className="content">

                        {/* finished or active submission */}
                        {this.props.reportData.deadLine != null ? (
                            <div>
                                {line1}
                                <br />
                                {line2}
                                {/* show file upload for active submission */}
                                {currentDate < this.props.reportData.deadLine && this.props.reportData.grade == grades.NOGRADE ? (
                                    <div>
                                        <p style={{ fontSize: "12px" }}>
                                            {this.state.submissionData.fileUrl ? "You have already submitted a document. Submitting a new document will overwrite the old one" : null }
                                        </p>
                                        <br />
                                        <input type="file" id="file"/>
                                        <br/>
                                        <button onClick={() => this.sendFile()}>Upload</button>
                                    </div>
                                // deadline passed
                                ) : (this.props.reportData.deadLine && !this.props.reportData.grade) ? (
                                        <div style={{"color":"red"}}>
                                            <br/>
                                            Submission deadline has passed. If you missed it, contact your coordinator to open up the submission again
                                        </div>
                                ) : ''}
                              </div>
                        ) : (
                            // submission not started
                            <div>
                                {line1}
                            </div>
                        )}

                        {/* Feedback */}
                        {/* {this.state.showFeedback && this.props.submissionData.submissionStatus == "finished" ? */}
                        <FeedbackList documentId={this.props.reportData.id}/>
                        {/* : ''} */}

                    </div>
                </div>            
            </div>
        )

    }
}

class FeedbackList extends Component {

    constructor(props) {
        super(props);
        this.state = { feedback: [] };
    }

    componentDidMount() {
        if(this.props.documentId) { // because not getting id for all documents from the API (for some reason...)
            func.getFeedback(this.props.documentId).then(response => {
                if(response._embedded) { // if not empty
                    this.setState({ feedback: response._embedded.feedbacks });
                }
            });
        }
    }

    render() {
        const feedbackList = this.state.feedback.map(obj =>
            <div key={obj.id}>
                <br/>
                <br/>
                <Feedback {...obj}/>
            </div>
        );
    
        return (
            <div>
                {feedbackList}
            </div>
        )
    }
}

class Feedback extends Component {

    constructor(props) {
        super(props);

        this.state = { feedbackUser: {} };
    }

    componentDidMount() {
        getUser(this.props.userId).then(response => {
            this.setState({ feedbackUser: response.entity })
        })
    }

    render() {
        return (
            <div className="feedback">
                <div className="header">
                    Feedback from {this.props.role + " " + this.state.feedbackUser.name}
                </div>
                <div className="content">
                    {this.props.text}
                </div>
            </div>
        )
    }
}

export default Submission