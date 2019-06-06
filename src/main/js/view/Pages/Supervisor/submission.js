'use strict'

import React, { Component } from 'react';
import { getFromAPI, formatDate } from './../../functions';
import * as func from './functions';
import * as enums from './../../enums';

export class Submission extends Component {

    constructor(props) {
        super(props);

        this.state = { reportData: {}, submissionData: {}, actionInProgress: false, feedback: {}, isLoaded: false }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        getFromAPI("/supervisor/" + this.props.type + "/" + this.props.userId).then(reportResponse => {
            func.getSubmission(reportResponse.entity.submissionId).then(submissionResponse => {
                this.setState({ reportData: reportResponse.entity, submissionData: submissionResponse.entity, actionInProgress: false, isLoaded: true });
            });
        });
    }

    answerReport(answer) {
        if (confirm("You cannot change your answer. Are you sure you want to " + (answer ? "approve" : "reject") + " this plan?")) {
            this.setState({ actionInProgress: true });

            func.modifyPlan(this.state.reportData.userId, answer).then(() => {
                this.props.onUpdate.forEach(callback => callback()); // update data on main page
                this.getData();
            });
        }
    }

    sendAssessment() {
        if (confirm("You cannot change your assessment. Are you sure you want to submit?")) {
            this.setState({ actionInProgress: true });

            func.sendFeedback(document.getElementById("feedbackBox").value, this.state.reportData).then(() => {
                this.props.onUpdate.forEach(callback => callback()); // update data on main page
                this.getData();
            });
        }
    }

    render() {
        return (
            !this.state.isLoaded
                ?
                <h2 className="loading">
                    Loading <i className="fa fa-spinner fa-spin" />
                </h2>
                :
                <div>
                    <h2>
                        {this.state.submissionData.submissionType == enums.dbSubmissionTypes.projectPlan
                            ? "Approve/Reject Project Plan"
                            : "Assess report"
                        }
                    </h2>

                    <table>
                        <tbody>
                            <tr>
                                <td>Submittee</td>
                                <td>{this.props.userName}</td>
                            </tr>
                            <tr>
                                <td>Submission Date</td>
                                <td>{formatDate(this.state.submissionData.submissionDate)}</td>
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

                    <br />
                    {this.state.submissionData.submissionType == enums.dbSubmissionTypes.projectPlan // Submission is a Project plan
                        ? this.state.reportData.approved != enums.projectPlanApprovedStatus.pending
                            ?
                            <div>
                                This project has already been {this.state.reportData.approved.toLowerCase()}. You cannot change your answer
                        </div>
                            :
                            <div>
                                <fieldset disabled={this.state.actionInProgress}>
                                    <button disabled={this.state.actionInProgress} onClick={() => this.answerReport(true)}>Approve</button>
                                    <button disabled={this.state.actionInProgress} onClick={() => this.answerReport(false)}>Reject</button>
                                </fieldset>
                            </div>
                        : // Submission is an Initial Report 
                        !this.state.reportData.supervisorId 
                            ? // feedback has not been sent
                            <div>
                                <fieldset disabled={this.state.actionInProgress}>
                                    Write Assessment
                                    <textarea className="feedbackBox" id="feedbackBox" />
                                    <br />
                                    <button type="submit" onClick={() => this.sendAssessment()}>
                                        Submit 
                                        {this.state.actionInProgress
                                            ? <i className="fa fa-spinner fa-spin" />
                                            : null
                                        }
                                    </button>
                                </fieldset>
                            </div>
                            : <div>Your have already sent your assessment</div>
                    }

                </div>
        )
    }
}