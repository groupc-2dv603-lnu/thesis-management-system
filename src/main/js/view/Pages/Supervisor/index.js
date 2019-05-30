//TODO använd inte lokal tid

'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Submission } from './submission'
import * as func from './functions'
import * as enums from './../../enums';
import { getUser } from './../../functions';
import './style.css';

// static class Popup {

// }

export default class Supervisor extends Component {

    constructor(props) {
        super(props);

        this.state = { studentsApplied: [], supervisedStudents: [] };
    }

    componentDidMount() {
        this.updateAppliedStudents();
        this.updateSupervisedStudents();
    }

    updateAppliedStudents() {
        func.getAppliedStudents().then(response => {
            this.setState({ studentsApplied: response.entity._embedded.students })
        });
    }

    updateSupervisedStudents() {
        func.getSupervisedStudents().then(response => {
            this.setState({ supervisedStudents: response.entity._embedded.students })
        });
    }

    render() {
        const studentRequests = this.state.studentsApplied.map(student =>
            <StudentRequest reference={this} key={student.userId} student={student} />
        )

        const supervisedStudents = this.state.supervisedStudents.map(student =>
            <SupervisedStudent key={student.userId} student={student} />
        )

        return (
            <div>
                {/* List of student requests */}
                <table className="supervisorBox">
                    <tbody>
                        {studentRequests}
                    </tbody>
                </table>

                {/* List of assigned student */}
                <h2>Student you supervise</h2>
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
                        {supervisedStudents}
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
        func.getMockUser(this.props.student.userId).then(response => {
            this.setState({ user: response })
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
        func.getMockUser(this.props.student.userId).then(response => {
            this.setState({ user: response })
        });

        func.getUserProjectPlan(this.props.student.userId).then(planResponse => {
            if (planResponse) {
                this.setState({ projectPlan: planResponse }); //.entity._embedded.submissions
                func.getSubmission(planResponse.submissionId).then(submissionResponse => {
                    this.setState({ projectPlanSubmission: submissionResponse });
                });
            }
        });

        func.getUserInitialReport(this.props.student.userId).then(reportResponse => {
            if (reportResponse) {
                this.setState({ initialReport: reportResponse }); //.entity._embedded.submissions
                func.getSubmission(reportResponse.submissionId).then(submissionResponse => {
                    this.setState({ projectPlanSubmission: submissionResponse });
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
        let currentDate = new Date().toISOString();

        return (
            <tr>
                <td>
                    {this.state.user.name}
                </td>
                <td>
                    {/*this.state.projectPlan.submissionId && currentDate > this.state.projectPlan.deadline && */ this.state.projectPlan.grade != enums.grades.NOGRADE // TODO check if supervisor already answered
                        ? // Student has a Project Plan available for review
                        <div className="link" onClick={() => this.setProjectPlanPopup(true)}>
                            Project Plan
                            {/* <Link className="link" to={"/supervisor/submission/" + this.state.projectPlan.submissionId}>
                                Project Plan
                            </Link> */}
                        </div>
                        :
                        <div>Project Plan</div>
                        // null
                    }
                    {/* Popup Project Plan (test) */}
                    {this.state.projectPlanPopup
                        ?
                        <div className="reportPopup">
                            <div className="inner">
                                <i className="fas fa-window-close link right" onClick={() => this.setProjectPlanPopup(false)} title="Close"/>
                                <Submission id={this.state.projectPlan.submissionId} />
                            </div>
                        </div>
                        :
                        null
                    }
                    {this.state.initialReport.submissionId && currentDate > this.state.initialReport.deadline // TODO check if supervisor has left feedback
                        ? // Student has an Initial Report available for review
                        <div className="link" onClick={() => this.setInitialReportPopup(true)}>
                            Initial Report
                            {/* <Link className="link" to={"/supervisor/submission/" + this.state.initialReport.submissionId}>
                                Initial Report
                            </Link> */}
                        </div>

                        :
                        <div className="unavailable">Initial Report</div>
                        // null
                    }
                    {/* Popup Initial Report (test) */}
                    {this.state.initialReportPopup
                        ?
                        <div className="reportPopup">
                            <div className="inner">
                                <i className="fas fa-window-close link right" onClick={() => this.setInitialReportPopup(false)} title="Close"/>
                                <Submission id={this.state.initialReport.submissionId} />
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
                    <div>
                        {this.state.projectPlanSubmission.submissionDate}
                    </div>
                    <div>
                        {this.state.initialReportSubmission.submissionDate}
                    </div>
                </td>
            </tr>
        )
    }
}