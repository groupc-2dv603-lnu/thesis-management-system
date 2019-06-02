//TODO använd inte lokal tid
//TODO sidan ska uppdateras efter man svarat på en request

'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Submission } from './submission'
import * as func from './functions'
import * as enums from './../../enums';
import { getUser } from './../../functions';
import './style.css';

export default class Supervisor extends Component {

    constructor(props) {
        super(props);

        this.state = { appliedStudents: [], assignedStudents: [], availableAsSupervisor: false };
    }

    componentDidMount() {
        this.updateAvailabilityStatus();
        this.updateAppliedStudents();
        this.updateAssignedStudents();
    }

    updateAvailabilityStatus() {
        func.getCurrentAvailability().then(response => {
            this.setState({ availableAsSupervisor: response.entity })
        })
    }
    updateAppliedStudents() {
        func.getAppliedStudents().then(response => {
            if (response.entity._embedded) {
                this.setState({ appliedStudents: response.entity._embedded.students })
            }
        });
    }
    updateAssignedStudents() {
        func.getAssignedStudents().then(response => {
            if (response.entity._embedded) {
                this.setState({ assignedStudents: response.entity._embedded.students })
            }
        });
    }


    toggleAvailability() {
        func.setAvailability(!this.state.availableAsSupervisor).then(() => {
            this.updateAvailabilityStatus();
        })
    }


    render() {
        const studentRequests = this.state.appliedStudents.map(student =>
            <StudentRequest reference={this} key={student.userId} student={student} />
        )

        const assignedStudents = this.state.assignedStudents.map(student =>
            <SupervisedStudent reference={this} key={student.userId} student={student} />
        )

        return (
            <div>
                {this.state.availableAsSupervisor
                    ?
                    <div>Your status is set as available. You can receive new supervisor requests from students</div>
                    :
                    <div>Your status is set to unavailable. You will not receive any new supervisor requests from students</div>
                }

                <button onClick={() => this.toggleAvailability()}>Change availability status</button>
                <br />
                <br />

                {/* List of student requests */}
                {this.state.appliedStudents.length > 0
                    ?
                    <table className="supervisorBox">
                        <tbody>
                            {studentRequests}
                        </tbody>
                    </table>
                    :
                    null
                }

                {/* List of assigned student */}
                <h2>Students you supervise</h2>
                <table className="studentList">
                    <tbody>
                        <tr>
                            <th>
                                Student
                            </th>
                            <th>
                                Submissions
                            </th>
                            <th width="0">
                                Status
                            </th>
                            <th>
                                Deadline
                            </th>
                        </tr>
                        {assignedStudents}
                    </tbody>
                </table>
            </div>
        )
    }
}


class StudentRequest extends Component {

    constructor(props) {
        super(props);

        this.state = { user: {} };
    }

    answerRequest(answer) {
        if (answer) {
            func.acceptRequest(this.props.student).then(() => {
                this.props.reference.updateAppliedStudents();
            });
        }
        else {
            func.rejectRequest(this.props.student).then(() => {
                this.props.reference.updateAppliedStudents();
            });
        }
        this.props.reference.updateAppliedStudents();
    }

    componentDidMount() {
        getUser(this.props.student.userId).then(response => {
            this.setState({ user: response.entity })
        });
    }

    render() {
        return (
            <tr>
                <td>
                    {this.state.user.name} wants you as supervisor
                </td>
                <td className="buttons">
                    <button onClick={() => this.answerRequest(true)}>Accept</button>
                    <button onClick={() => this.answerRequest(false)}>Decline</button>
                </td>
            </tr>
        )
    }
}


class SupervisedStudent extends Component {

    constructor(props) {
        super(props);

        this.state = { user: {}, projectPlan: {}, projectPlanSubmission: {}, initialReport: {}, initialReportSubmission: {}, projectPlanPopup: false, initialReportPopup: false };
    }

    componentDidMount() {
        getUser(this.props.student.userId).then(response => {
            this.setState({ user: response.entity })
        });

        func.getUserProjectPlan(this.props.student.userId).then(planResponse => {
            if (planResponse) {
                this.setState({ projectPlan: planResponse.entity });
                func.getSubmission(planResponse.entity.submissionId).then(submissionResponse => {
                    this.setState({ projectPlanSubmission: submissionResponse.entity });
                });
            }
        });

        func.getUserInitialReport(this.props.student.userId).then(reportResponse => {
            if (reportResponse) {
                this.setState({ initialReport: reportResponse.entity });
                func.getSubmission(reportResponse.entity.submissionId).then(submissionResponse => {
                    this.setState({ initialReportSubmission: submissionResponse.entity });
                });
            }
        });

    }

    setProjectPlanPopup(state) {
        this.setState({ projectPlanPopup: state });
    }

    setInitialReportPopup(state) {
        this.setState({ initialReportPopup: state });
    }

    render() {
        const currentDate = new Date().toISOString();

        return (
            <tr>
                <td>
                    {this.state.user.name}
                </td>
                <td>
                    {/* Student has a Project Plan available for review */}
                    {this.state.projectPlan.grade == enums.grades.PASS
                        ?
                        <div className="link underscored" onClick={() => this.setProjectPlanPopup(true)}>
                            Project Plan
                        </div>
                        :
                        <div className="unavailable">Project Plan</div>
                        // null
                    }
                    {/* Popup Project Plan */}
                    {this.state.projectPlanPopup
                        ?
                        <div className="popupOverlay">
                            <div className="innerPopup">
                                <i className="fas fa-window-close link right" onClick={() => this.setProjectPlanPopup(false)} title="Close" />
                                <Submission reference={this.props.reference} submissionData={this.state.projectPlanSubmission} user={this.state.user} reportData={this.state.projectPlan} />
                            </div>
                        </div>
                        :
                        null
                    }
                    {/* Student has an Initial Report available for review, deadline has passed, and at least one reader and one opponent has been assigned */}
                    {this.state.initialReport.submissionId && currentDate > this.state.initialReport.deadLine //&& this.state.initialReport.assignedReaders.length > 0 && this.state.initialReport.assignedOpponents.length > 0
                        ?
                        <div className="link underscored" onClick={() => this.setInitialReportPopup(true)}>
                            Initial Report
                        </div>
                        :
                        <div className="unavailable">Initial Report</div>
                        // null
                    }
                    {/* Popup Initial Report */}
                    {this.state.initialReportPopup
                        ?
                        <div className="popupOverlay">
                            <div className="innerPopup">
                                <i className="fas fa-window-close link right" onClick={() => this.setInitialReportPopup(false)} title="Close" />
                                <Submission reference={this.props.reference} submissionData={this.state.initialReportSubmission} user={this.state.user} reportData={this.state.initialReport} />
                            </div>
                        </div>
                        :
                        null
                    }
                </td>
                {/* Status icons */}
                <td className="center">
                    {/* Project Plan has been graded by coordinator */}
                    {this.state.projectPlan.grade == enums.grades.PASS
                        ?
                        // Supervisor has not given an answer on the report
                        this.state.projectPlan.approved != enums.projectPlanApprovedStatus.pending
                            ?
                            <i className="fa fa-check" title="You have given an answer on this report" />
                            :
                            <i className="fa fa-exclamation" style={{color: "red"}} title="You have NOT given an answer on this report" />
                        :
                        // <i className="fas fa-ban" title="You cannot give answer on this report yet. The student has submitted a report, but it has not yet been graded by the coordinator" />
                        null
                    }
                    <br/>
                    {/* There is an initial report uploaded, deadline for it has passed, and at least one reader and one opponent has been assigned */}
                    {this.state.initialReport.submissionId && currentDate > this.state.initialReport.deadLine //&& this.state.initialReport.assignedReaders.length > 0 && this.state.initialReport.assignedOpponents.length > 0
                        ?
                        // Supervisor has written assessment
                        this.state.initialReport.supervisorId
                            ?
                            <i className="fa fa-check" title="You have given an answer on this report" />
                            :
                            <i className="fa fa-exclamation" style={{color: "red"}} title="You have NOT given an answer on this report" />
                        :
                        null
                    }

                </td>
                <td>
                    {this.state.projectPlan.deadLine
                        ?
                        <div className="nowrap">{this.state.projectPlan.deadLine}</div>
                        :
                        <div>Not set</div>
                    }
                    {this.state.initialReport.deadLine
                        ?
                        <div className="nowrap">
                            {this.state.initialReport.deadLine}
                        </div>
                        :
                        <div>Not set</div>
                    }
                </td>
            </tr>
        )
    }
}