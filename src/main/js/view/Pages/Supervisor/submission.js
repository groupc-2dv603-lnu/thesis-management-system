'use strict'

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as func from './functions';
import * as styles from './styles';
import { dbTypes } from './../../enums';

export class Submission extends Component {
    
    constructor(props) {
        super(props);

        this.state = { submissionData: {}, user: {}, reportData: {} };
    }

    componentDidMount() {
        func.getSubmission(this.props.match.params.id).then(submissionResponse => {
            this.setState({ submissionData: submissionResponse });
            func.getMockUser(submissionResponse.userId).then(userResponse => {
                // TODO get reportData with userId. need to pass it to approve/rejectPlan and for sendFeedback
                this.setState({ user: userResponse })
            })
        });
        
    }

    approveReport() {
        if(confirm("Are you sure you want to approve this plan?")) {
            console.log("accepting plan")
            func.approvePlan(this.state.reportData);
            location.href = "/#/supervisor";
        }
    }
    
    rejectReport() {
        if(confirm("Are you sure you want to reject this plan?")) {
            console.log("rejecting plan")
            func.rejectPlan(this.state.reportData);
            location.href = "/#/supervisor";
        }
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

                {this.state.submissionData.type == dbTypes.projectPlan ?
                    <div>Approve/Reject project plan</div>
                :
                    <div>Assess report</div>
                }
                made by { this.state.user.name }
                <br/>
                <br/>
                <a href={this.state.submissionData.fileUrl} download>Download report</a>
                <br/>
                <br/>
                {this.state.submissionData.type == dbTypes.projectPlan ?
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