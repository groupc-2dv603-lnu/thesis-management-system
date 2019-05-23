'use strict'

import React, { Component } from 'react';
import { capitalizeFirstLetter, uploadFile, getFeedback, getUser } from './functions';

class Submission extends Component {

    constructor(props) {
        super(props);
        this.state = { showFeedback: false };

        this.toggleShowFeedback = this.toggleShowFeedback.bind(this);
    }

    toggleShowFeedback() {
        this.setState({ showFeedback: !this.state.showFeedback });
    }

    render() {
        let line1, line2, styleClass;
        
        let currentDate = new Date().toISOString(); // TODO get date from server

        // submission graded
        if(this.props.documentData.grade) {
        // if(this.props.submissionData && this.props.submissionData.status == "finished") {
            line1 = "Status: Graded";
            line2 = "Grade: " + capitalizeFirstLetter(this.props.documentData.grade);
            styleClass = "finished"; // this.props.submissionData.status;
        }
        // deadline is set (but not graded) == submission counted as active
        else if(this.props.documentData.deadline) {
            // else if(this.props.submissionData && this.props.submissionData.status == "active") {
                line1 = "Status: " + (this.props.submissionData.fileURL ? "Submitted" : "Not submitted");
                line2 = "Deadline: " + new Date(this.props.documentData.deadline).toUTCString();
                styleClass = "active"; // this.props.submissionData.status;
        }
        else {
            line1 = "N/A"
            styleClass = "disabled";
        }

        return (
            <div>
                <div className={"submission " + styleClass}>
                    <div className="header" onClick={() => this.toggleShowFeedback()}>{capitalizeFirstLetter(this.props.type)}</div>
                    <div className="content">
                        {/* finished or active submission */}
                        {this.props.documentData.deadline != null ? (
                            <div>
                                {line1}
                                <br />
                                {line2}
                                {/* show file upload for active submission */}
                                {currentDate < this.props.documentData.deadline && !this.props.documentData.grade ? (
                                    <div>
                                        <br />
                                        <input type="file" id="file"/>
                                        <br/>
                                        <button onClick={() => uploadFile(document.getElementById("file").files[0])}>Upload</button>
                                    </div>
                                // deadline passed
                                ) : (this.props.documentData.deadline && !this.props.documentData.grade) ? (
                                        <div style={{"color":"red"}}>
                                            <br/>
                                            Submission deadline has passed. If you missed it, contact your coordinator to open up the submission again
                                        </div>
                                ) : ''}
                                {/* Feedback */}
                                {this.state.showFeedback && this.props.submissionData.status == "finished" ? <FeedbackList submissionId={this.props.submissionData.id}/> : ''}
                                
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
            this.setState({ feedback: response }); //.entity._embedded.feedback
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