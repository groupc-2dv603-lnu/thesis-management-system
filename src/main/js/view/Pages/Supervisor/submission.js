'use strict'

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as func from './functions';
import { dbTypes } from './../../enums';

export class Submission extends Component {
    
    constructor(props) {
        super(props);

        this.state = { submissionData: {}, user: {}, reportData: {} };
    }

    componentDidMount() {
        func.getSubmission(this.props.id).then(submissionResponse => {
            this.setState({ submissionData: submissionResponse });
            func.getMockUser(submissionResponse.userId).then(userResponse => {
                // TODO get reportData with userId. need to pass it to approve/rejectPlan and for sendFeedback
                this.setState({ user: userResponse })
            })
        });
        
    }

    answerReport(answer) {
        if(confirm("You cannot change your answer. Are you sure you want to " + (answer ? "approve" : "reject") + " this plan?")) {
            console.log("accepting plan") // TODO debug
            if(answer) {
                func.approvePlan(this.state.reportData);
            }
            else {
                func.rejectPlan(this.state.reportData);
            }
            location.href = "/#/supervisor";
        }
    }
    
    
    sendAssessment() {
        if(confirm("You cannot change your assessment. Are you sure you want to submit?")) {
            func.sendFeedback(document.getElementById("feedbackBox").value);
            document.getElementById("feedbackBox").value = "";
            location.href = "/#/supervisor";
        }
    }

    render() {
        return (
            <div>
                <h2>
                    {this.state.submissionData.type == dbTypes.projectPlan 
                    ?
                        <span >Approve/Reject Project Plan</span>
                    :
                        <span>Assess report</span>
                    }
                </h2>

                <table>
                    <tbody>
                        <tr>
                            <td>Submittee</td>
                            <td>{this.state.user.name}</td>
                        </tr>
                        <tr>
                            <td>Submission Date</td>
                            <td>{this.state.submissionData.submissionDate}</td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <a href={this.state.submissionData.fileUrl} download>
                                    <button>Download plan</button>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <br/>
                {this.state.submissionData.type == dbTypes.projectPlan
                ? // Submission is a Project plan
                    <div>
                        <button onClick={() => this.answerReport(true)}>Approve</button>
                        <button onClick={() => this.answerReport(false)}>Reject</button>
                    </div>
                : // else (submissions is an Initial Report)
                    <div>
                        Write Assessment
                        <textarea className="feedbackBox" id="feedbackBox"></textarea>
                        <br/>
                        <button type="submit" onClick={() => this.sendAssessment()}>Submit</button>
                    </div>
                }

            </div>
        )
    }
}