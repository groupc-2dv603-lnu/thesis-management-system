'use strict'

import React, { Component } from 'react';
import { getSubmission, capitalizeFirstLetter, uploadFile, getFeedback, getUser } from './functions';

class Submission extends Component {

    constructor(props) {
        super(props);
        this.state = { showFeedback: 0 };

        this.submissionData = getSubmission(this.props.submissionId);
        this.toggleShowFeedback = this.toggleShowFeedback.bind(this);
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
        // if(this.props.grade != null) {
        if(this.submissionData && this.submissionData.status == "finished") {
            line1 = "Status: Graded";
            line2 = "Grade: " + capitalizeFirstLetter(this.props.grade);
            styleClass = this.submissionData.status;
        }
        // deadline is set (but not graded) == submission counted as active
        // else if(this.props.deadline) {
        else if(this.submissionData && this.submissionData.status == "active") {
            line1 = "Status: " + (this.submissionData.fileURL ? "Submitted" : "Not submitted");
            line2 = "Deadline: " + new Date(this.props.deadline).toUTCString();
            styleClass = this.submissionData.status; //"active";
        }
        else {
            line1 = "N/A"
            styleClass = "disabled";
        }

        return (
            <div>
                <div className={"submission " + styleClass}>
                    <div className="header" onClick={() => this.toggleShowFeedback(this.props.id)}>{capitalizeFirstLetter(this.props.type)}</div>
                    <div className="content">
                        {/* finished or active submission */}
                        {this.props.deadline != null ? (
                            <div>
                                {line1}
                                <br />
                                {line2}
                                {/* show file upload for active submission */}
                                {currentDate < this.props.deadline && !this.props.grade ? (
                                    <div>
                                        <br />
                                        <input type="file" id="file"/>
                                        <br/>
                                        <button onClick={() => uploadFile(document.getElementById("file").files[0])}>Upload</button>
                                    </div>
                                // deadline passed
                                ) : (this.props.deadline && !this.props.grade) ? (
                                        <div style={{"color":"red"}}>
                                            <br/>
                                            Submission deadline has passed. If you missed it, contact your coordinator to open up the submission again
                                        </div>
                                ) : ''}
                                {/* Feedback */}
                                {this.state.showFeedback == this.props.id ? <FeedbackList submissionId={this.submissionData.id}/> : ''}
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
        this.feedback = getFeedback(this.props.submissionId);
    }

    render() {
        const feedbackList = this.feedback.map(obj =>
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
    render() {
        return (
            <div className="feedback">
                <div className="header">
                    Feedback from {this.props.role + " " + getUser(this.props.userId).name}
                </div>
                <div className="content">
                    {this.props.text}
                </div>
            </div>
        )
    }
}

export default Submission