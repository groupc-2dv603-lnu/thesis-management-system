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

        this.state = { appliedStudents: [], assignedStudents: [] };
    }

    componentDidMount() {
        this.updateAppliedStudents();
        this.updateAssignedStudents();
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

    render() {
        const studentRequests = this.state.appliedStudents.map(student =>
            <StudentRequest reference={this} key={student.userId} student={student} />
        )

        const assignedStudents = this.state.assignedStudents.map(student =>
            <SupervisedStudent key={student.userId} student={student} />
        )

        return (
            <div>
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
                            {/* <th width="10px">
                                Status
                            </th> */}
                            <th>
                                Submission date
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
            func.acceptRequest(this.props.student);
        }
        else {
            func.rejectRequest(this.props.student);
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
        return (
            <tr>
                <td>
                    {this.state.user.name}
                </td>
                <td>
                    {/* Student has a Project Plan available for review */}
                    {this.state.projectPlan.grade == enums.grades.PASS && this.state.projectPlan.approved != enums.projectPlanApprovedStatus.approved
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
                                <Submission submissionData={this.state.projectPlanSubmission} user={this.state.user} reportData={this.state.projectPlan} />
                            </div>
                        </div>
                        :
                        null
                    }
                    {/* Student has an Initial Report available for review */}
                    {this.state.initialReport.submissionId && !this.state.initialReport.supervisorId
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
                                <Submission submissionData={this.state.initialReportSubmission} user={this.state.user} reportData={this.state.initialReport} />
                            </div>
                        </div>
                        :
                        null
                    }
                </td>
                {/* <td className="center">
                    {this.state.projectPlan.submissionId && currentDate > this.state.projectPlan.deadline && this.state.projectPlan.grade == enums.grades.PASS
                    ?
                        <div>
                            {this.state.
                            ?
                                <i className="fa fa-check" title="You have given an answer on this report"/>
                            :
                                <i className="fa fa-exclamation"/>
                            }
                        </div>
                    :
                    <div>
                    </div>
                }
                </td> */}
                <td>
                    {this.state.projectPlanSubmission.submissionDate
                        ?
                        <div>{this.state.projectPlanSubmission.submissionDate}</div>
                        :
                        <div>-</div>
                    }
                    {this.state.initialReportSubmission.submissionDate
                        ?
                        <div>{this.state.initialReportSubmission.submissionDate}</div>
                        :
                        <div>-</div>
                    }
                </td>
            </tr>
        )
    }
}