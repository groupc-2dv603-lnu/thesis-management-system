'use strict'

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as func from './functions';
import * as styles from './styles';

export class Submission extends Component {
    
    constructor(props) {
        super(props);

        this.state = { submissionData: {}, user: {}, reportData: {} };
    }

    componentDidMount() {
        func.getSubmission(this.props.match.params.id).then(submissionResponse => {
            this.setState({ submissionData: submissionResponse });
            func.getMockUser(response.studentId).then(userResponse => {
                // TODO get report with userId
                this.setState({ user: userResponse })
            })
        });
        
    }

    approveReport() {
        func.approvePlan()
        window.location.href = "/#/supervisor";
    }
    
    rejectReport() {
        console.log("SSsssssuckah!")
        window.location.href = "/#/supervisor";
    }

    sendFeedback() {
        func.sendFeedback(document.getElementById("feedbackBox").value);
        document.getElementById("feedbackBox").value = "";
    }

    render() {
    
        return (
            <div>
                {/* TEMP */}
                <Link to="/supervisor">
                    <button>Back</button>
                </Link>
                <br/>
                <br/>

                {this.state.submissionData.type == "project plan" ?
                    <div>Give feedback on project plan</div>
                :
                    <div>
                        Assess report
                    </div>
                }
                made by { this.state.user.name }
                <br/>
                <br/>
                <a href={this.state.submissionData.fileURL} download>Download report</a>
                <br/>
                <br/>
                {this.state.submissionData.type == "project plan" ?
                    <div>
                        <button onClick={() => this.approveReport()}>Approve</button>
                        <button onClick={() => this.rejectReport()}>Reject</button>
                    </div>
                :
                    <div>
                        Assessment
                        <textarea style={styles.feedbackBox} id="feedbackBox"></textarea>
                        <br/>
                        <button type="submit" onClick={() => this.sendFeedback()}>Send</button>
                    </div>
                }

            </div>
        )
    }
}