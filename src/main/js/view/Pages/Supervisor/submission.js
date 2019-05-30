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

    sendAssessment() {
        func.sendFeedback(document.getElementById("feedbackBox").value);
        document.getElementById("feedbackBox").value = "";
    }

    render() {
        return (
            <div>
                {/* TEMP */}
                {/* <Link to="/supervisor">
                    <button>Back</button>
                </Link>
                <br/>
                <br/> */}

                <h2>
                    {this.state.submissionData.type == dbTypes.projectPlan 
                    ?
                        <span >Approve/Reject Project Plan</span>
                    :
                        <span>Assess report</span>
                    }
                </h2>

                <table width="100%" cellSpacing="0" cellPadding="5">
                    <tbody>
                        <tr>
                            <td>Submittee</td>
                            <td>{this.state.user.name}</td>
                        </tr>
                        <tr style={{backgroundColor: "#f0f0f0"}}>
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

                {/* <div style={rowStyle1}>
                    made by { this.state.user.name }
                </div>
                <div style={rowStyle2}>
                    <a href={this.state.submissionData.fileUrl} download>Download report</a>
                </div>
                <div style={rowStyle1}>
                    {this.state.submissionData.submissionDate}
                </div> */}

                <br/>
                {this.state.submissionData.type == dbTypes.projectPlan
                ? // Submission is a Project plan
                    <div>
                        <button onClick={() => this.approveReport()}>Approve</button>
                        <button onClick={() => this.rejectReport()}>Reject</button>
                    </div>
                : // else (submissions is an Initial Report)
                    <div>
                        Write Assessment
                        <textarea style={styles.feedbackBox} id="feedbackBox"></textarea>
                        <br/>
                        <button type="submit" onClick={() => this.sendAssessment()}>Send</button>
                    </div>
                }

            </div>
        )
    }
}