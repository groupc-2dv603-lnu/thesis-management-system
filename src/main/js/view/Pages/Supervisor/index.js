'use strict';

import React, { Component } from 'react';
import { Submission } from './submission'
import * as func from './functions'
import * as enums from './../../enums';
import { getUser, formatDate } from './../../functions';
import moment from "moment";
import './style.css';

export default class Supervisor extends Component {

    constructor(props) {
        super(props);

        this.state = { appliedStudents: [], assignedStudents: [], availableAsSupervisor: false, isLoaded: false };

        // this.getAvailabilityStatus = this.getAvailabilityStatus.bind(this);
        this.getAppliedStudents = this.getAppliedStudents.bind(this);
        this.getAssignedStudents = this.getAssignedStudents.bind(this);
    }

    componentDidMount() {
        let loadedData = 0;
        
        this.getAvailabilityStatus().then(() => this.checkLoadedState(++ loadedData));
        this.getAppliedStudents().then(() => this.checkLoadedState(++ loadedData));
        this.getAssignedStudents().then(() => this.checkLoadedState(++ loadedData));
    }

    checkLoadedState(counter) {
        if(counter == 3) {
            this.setState({ isLoaded: true })
        }
    }

    getAvailabilityStatus() {
        return func.getCurrentAvailability().then(response => {
            this.setState({ availableAsSupervisor: response.entity });
        })
    }

    getAppliedStudents() {
        return func.getAppliedStudents().then(response => {
            if (response.entity._embedded) {
                this.setState({ appliedStudents: response.entity._embedded.students });
            }
            else {
                this.setState({ appliedStudents: [] });
            }
        });
    }
    
    getAssignedStudents() {
        return func.getAssignedStudents().then(response => {
            if (response.entity._embedded) {
                this.setState({ assignedStudents: response.entity._embedded.students });
            }
            else {
                this.setState({ assignedStudents: [] });
            }
        });
    }

    toggleAvailability() {
        func.setAvailability(!this.state.availableAsSupervisor).then(() => {
            this.getAvailabilityStatus();
        })
    }

    render() {
        // new Map([["appliedStudents", this.getAppliedStudents], ["assignedStudents", this.getAssignedStudents]]
        const studentRequests = this.state.appliedStudents.map(student =>
            <StudentRequest onUpdate={[this.getAppliedStudents, this.getAssignedStudents]} key={student.userId} student={student} />
        )

        const assignedStudents = this.state.assignedStudents.map(student =>
            <SupervisedStudent key={student.userId} student={student} />
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
                    : null
                }

                {/* List of assigned student */}
                <h2>Students you supervise</h2>
                <table className="studentList" cellSpacing="0">
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
                        {!this.state.isLoaded
                            ?
                            <tr>
                                <td colSpan="4">
                                    Loading <i className="fa fa-spinner fa-spin" />
                                </td>
                            </tr>
                            : assignedStudents
                        }
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
                this.props.onUpdate.forEach(callback => callback());
            });
        }
        else {
            func.rejectRequest(this.props.student).then(() => {
                this.props.onUpdate[0]();
            });
        }
    }

    componentDidMount() {
        getUser(this.props.student.userId).then(response => {
            this.setState({ user: response.entity });
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

        this.state = { user: {}, projectPlan: {}, initialReport: {}, projectPlanPopup: false, initialReportPopup: false };

        this.getProjectPlan = this.getProjectPlan.bind(this);
        this.getInitialReport = this.getInitialReport.bind(this);
    }

    componentDidMount() {
        getUser(this.props.student.userId).then(response => {
            this.setState({ user: response.entity })
        });

        this.getProjectPlan();
        this.getInitialReport();
    }

    getProjectPlan() {
        func.getUserProjectPlan(this.props.student.userId).then(planResponse => {
            if (planResponse) {
                this.setState({ projectPlan: planResponse.entity });
            }
        });
    }

    getInitialReport() {
        func.getUserInitialReport(this.props.student.userId).then(reportResponse => {
            if (reportResponse) {
                this.setState({ initialReport: reportResponse.entity });
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
        const currentDate = moment();
        const ppDeadline = moment(this.state.projectPlan.deadLine);
        const irDeadline = moment(this.state.initialReport.deadLine);

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
                        : <div className="unavailable">Project Plan</div>
                    }
                    {/* Popup Project Plan */}
                    {this.state.projectPlanPopup
                        ?
                        <div className="popupOverlay">
                            <div className="innerPopup">
                                <i className="fas fa-window-close link right" onClick={() => this.setProjectPlanPopup(false)} title="Close" />
                                <Submission onUpdate={[this.getProjectPlan, this.getInitialReport]} userName={this.state.user.name} userId={this.props.student.userId} type="projectPlan" />
                            </div>
                        </div>
                        : null
                    }

                    {/* Student has an Initial Report available for review, deadline has passed, and at least one reader and one opponent has been assigned */}
                    {this.state.initialReport.submissionId && this.state.initialReport.assignedReaders.length > 0 && this.state.initialReport.assignedOpponents.length > 0 // && currentDate > irDeadline
                        ?
                        <div className="link underscored" onClick={() => this.setInitialReportPopup(true)}>
                            Initial Report
                        </div>
                        : <div className="unavailable">Initial Report</div>
                    }
                    {/* Popup Initial Report */}
                    {this.state.initialReportPopup
                        ?
                        <div className="popupOverlay">
                            <div className="innerPopup">
                                <i className="fas fa-window-close link right" onClick={() => this.setInitialReportPopup(false)} title="Close" />
                                <Submission onUpdate={[this.getProjectPlan, this.getInitialReport]} userName={this.state.user.name} userId={this.props.student.userId} type="initialReport" />
                            </div>
                        </div>
                        : null
                    }
                </td>
                {/* Status icons */}
                <td className="center">
                    {/* Project Plan has been graded by coordinator */}
                    {this.state.projectPlan.grade == enums.grades.PASS
                        ? this.state.projectPlan.approved != enums.projectPlanApprovedStatus.pending // Supervisor has not given an answer on the report
                            ? <i className="fa fa-check" title="You have given an answer on this report" />
                            : <i className="fa fa-exclamation" style={{ color: "red" }} title="You have NOT given an answer on this report" />
                        : this.state.projectPlan.submissionId // There is a submission, but it has not been graded
                            ? <i className="fas fa-lock" title="A report has been submitted, but you cannot reply to it before it has been graded by the coordinator" />
                            : <i className="fas fa-times" style={{ color: "#bbb" }} title="No report has been uploaded yet" />
                    }

                    <br />

                    {/* The initial report has been assessed  */}
                    {this.state.initialReport.supervisorId  // Supervisor has written assessment
                        ? <i className="fa fa-check" title="You have given an answer on this report" />
                        : this.state.initialReport.submissionId
                            // ? currentDate < irDeadline // deadline has not passed
                            //     ? <i className="fas fa-lock" title="A report has been submitted, but you cannot write an assessment before the deadline has passed" />
                                ? this.state.initialReport.assignedReaders.length > 0 && this.state.initialReport.assignedOpponents.length > 0 // report has been assigned an opponent and at least one reader
                                    ? <i className="fa fa-exclamation" style={{ color: "red" }} title="You have NOT given an answer on this report" />
                                    : <i className="fas fa-lock" title="A report has been submitted, but you cannot write an assessment before an opponent and at least one reader has been assigned to the report" />
                            : <i className="fas fa-times" style={{ color: "#bbb" }} title="No report has been uploaded yet" />
                    }

                </td>
                <td>
                    {this.state.projectPlan.deadLine
                        ? <div className="nowrap">{formatDate(ppDeadline)}</div>
                        : <div>Not set</div>
                    }
                    {this.state.initialReport.deadLine
                        ?
                        <div className="nowrap">
                            {formatDate(irDeadline)}
                        </div>
                        : <div>Not set</div>
                    }
                </td>
            </tr>
        )
    }
}