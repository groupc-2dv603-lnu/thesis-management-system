'use strict'

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as func from './functions';
import { getUser } from './../../functions';
import * as enums from './../../enums';

export class Submission extends Component {

    constructor(props) {
        super(props);
    }

    answerReport(answer) {
        if (confirm("You cannot change your answer. Are you sure you want to " + (answer ? "approve" : "reject") + " this plan?")) {

            if (answer) {
                func.approvePlan(this.props.reportData.userId).then(() => {
                    this.props.reference.updateAppliedStudents();
                });
            }
            else {
                func.rejectPlan(this.props.reportData.userId);
            }
        }
    }


    sendAssessment() {
        if (confirm("You cannot change your assessment. Are you sure you want to submit?")) {
            func.sendFeedback(document.getElementById("feedbackBox").value, this.props.reportData).then(() => {
            });
        }
    }

    render() {
        return (
            <div>
                <h2>
                    {this.props.submissionData.submissionType == enums.dbSubmissionTypes.projectPlan
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
                            <td>{this.props.user.name}</td>
                        </tr>
                        <tr>
                            <td>Submission Date</td>
                            <td>{this.props.submissionData.submissionDate}</td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <a href={this.props.submissionData.fileUrl} download>
                                    <button>Download plan</button>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <br />
                {this.props.submissionData.submissionType == enums.dbSubmissionTypes.projectPlan
                    ? // Submission is a Project plan
                    this.props.reportData.approved != enums.projectPlanApprovedStatus.pending
                        ?
                        <div>This project has already been {this.props.reportData.approved.toLowerCase()}. You cannot change your answer</div>
                        :
                        <div>
                            <button onClick={() => this.answerReport(true)}>Approve</button>
                            <button onClick={() => this.answerReport(false)}>Reject</button>
                        </div>
                    : // else (submissions is an Initial Report)
                    !this.props.reportData.supervisorId // (if) feedback has not been sent
                        ?
                        <div>
                            Write Assessment
                                        <textarea className="feedbackBox" id="feedbackBox"></textarea>
                            <br />
                            <button type="submit" onClick={() => this.sendAssessment()}>Submit</button>
                        </div>
                        :
                        <div>
                            Your have already sent your assessment
                        </div>
                }

            </div>
        )
    }
}