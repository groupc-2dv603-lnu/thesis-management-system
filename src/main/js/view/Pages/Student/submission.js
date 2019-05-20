'use strict'

import React, { Component } from 'react';
import { getSubmissionData, capitalizeFirstLetter, uploadFile, getFeedback, getUser, getPPData } from './functions';

class Submission extends Component {

    constructor(props) {
        super(props);
        this.state = { showFeedback: 0, reportData: {}, submissionData: {} };

        this.toggleShowFeedback = this.toggleShowFeedback.bind(this);
    }

    componentDidMount() {
        //TODO ewww...fucking terrible
        if(this.props.type == "Project Description") {
            getPDData().then(report => {
                this.setState({ reportData: report.entity });
                getSubmissionData(report.entity.submissionId).then(submission => {
                    this.setState({ submissionData: submission });
                });
            })
        }
        else if(this.props.type == "Project Plan") {
            getPPData().then(report => {
                this.setState({ reportData: report.entity });
                getSubmissionData(report.entity.submissionId).then(submission => {
                    this.setState({ submissionData: submission });
                });
            })
        }
        else if(this.props.type == "Initial Report") {
            getIRData().then(report => {
                this.setState({ reportData: report.entity });
                getSubmissionData(report.entity.submissionId).then(submission => {
                    this.setState({ submissionData: submission });
                });
            })
        }
        else if(this.props.type == "Final Report") {
            getFRData().then(report => {
                this.setState({ reportData: report.entity });
                getSubmissionData(report.entity.submissionId).then(submission => {
                    this.setState({ submissionData: submission });
                });
            })
        }

    }

    toggleShowFeedback(submissionId) {
        if(this.state.showFeedback == 0)
            this.setState({ showFeedback: submissionId });
        else
            this.setState({ showFeedback: 0 });
    }

    render() {
        let line1, line2, styleClass;
        
        let currentDate = new Date().toISOString(); // TODO get date from server

        // submission graded
        // if(this.state.reportData.grade != null) {
        if(this.state.submissionData && this.state.submissionData.status == "finished") {
            line1 = "Status: Graded";
            line2 = "Grade: " + capitalizeFirstLetter(this.state.reportData.grade);
            styleClass = this.state.submissionData.status;
        }
        // deadline is set (but not graded) == submission counted as active
        // else if(this.state.reportData.deadline) {
            else if(this.state.submissionData && this.state.submissionData.status == "active") {
                line1 = "Status: " + (this.state.submissionData.fileURL ? "Submitted" : "Not submitted");
                line2 = "Deadline: " + new Date(this.state.reportData.deadline).toUTCString();
                styleClass = this.state.submissionData.status; //"active";
            }
            else {
                line1 = "N/A"
                styleClass = "disabled";
        }

        return (
            <div>
                <div className={"submission " + styleClass}>
                    <div className="header" onClick={() => this.toggleShowFeedback(this.state.reportData.id)}>{capitalizeFirstLetter(this.props.type)}</div>
                    <div className="content">
                        {/* finished or active submission */}
                        {this.state.reportData.deadline != null ? (
                            <div>
                                {line1}
                                <br />
                                {line2}
                                {/* show file upload for active submission */}
                                {currentDate < this.state.reportData.deadline && !this.state.reportData.grade ? (
                                    <div>
                                        <br />
                                        <input type="file" id="file"/>
                                        <br/>
                                        <button onClick={() => uploadFile(document.getElementById("file").files[0])}>Upload</button>
                                    </div>
                                // deadline passed
                                ) : (this.state.reportData.deadline && !this.state.reportData.grade) ? (
                                        <div style={{"color":"red"}}>
                                            <br/>
                                            Submission deadline has passed. If you missed it, contact your coordinator to open up the submission again
                                        </div>
                                ) : ''}
                                {/* Feedback */}
                                {this.state.showFeedback == this.state.reportData.id ? <FeedbackList submissionId={this.state.submissionData.id}/> : ''}
                            </div>
                        ) : (
                            // submission not started
                            <div>
                                {line1}
                            </div>
                        )}
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
        getFeedback(this.props.submissionId).then(response => {
            this.setState({ feedback: response.entity._embedded.feedback });
        });
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