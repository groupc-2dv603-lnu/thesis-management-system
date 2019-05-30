//TODO design
//TODO använd inte lokal tid
//TODO (allmän) använd globala enums

'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as func from './functions'
import { getUser } from './../../functions';
import './style.css';

const dataStyle = {
    padding: "5px",
    verticalAlign: "top"
}



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
            <StudentRequest reference={this} key={student.userId} student={student}/>
        )
        
        const supervisedStudents = this.state.supervisedStudents.map(student =>
            <SupervisedStudent key={student.userId} student={student}/>
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
                                Submissions available for review
                            </th>
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
        if(answer) {
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

        this.state = { user: {}, projectPlan: {}, projectPlanSubmission: {}, initialReport: {}, initialReportSubmission: {} };
    }

    componentDidMount() {
        func.getMockUser(this.props.student.userId).then(response => {
            this.setState({ user: response })
        });

        func.getUserProjectPlan(this.props.student.userId).then(planResponse => {
            if(planResponse) {
                this.setState({ projectPlan: planResponse }); //.entity._embedded.submissions
                func.getSubmission(planResponse.submissionId).then(submissionResponse => {
                    this.setState({ projectPlanSubmission: submissionResponse });
                });
            }
        });
        
        func.getUserInitialReport(this.props.student.userId).then(reportResponse => {
            if(reportResponse) {
                this.setState({ initialReport: reportResponse }); //.entity._embedded.submissions
                func.getSubmission(reportResponse.submissionId).then(submissionResponse => {
                    this.setState({ projectPlanSubmission: submissionResponse });
                });
            }
        });
        
    }

    render()  {
        let currentDate = new Date().toISOString();

        return (
            <tr>
                <td style={dataStyle}>
                    {this.state.user.name}
                </td>
                <td style={dataStyle}>
                    {this.state.projectPlan.submissionId && currentDate > this.state.projectPlan.deadline
                    ? // Student has a Project Plan available for review
                    <div>
                            <Link className="link" to={"/supervisor/submission/" + this.state.projectPlan.submissionId}>
                                Project Plan
                            </Link>
                            <br/>
                        </div>
                    :
                        null
                    }
                    {this.state.initialReport.submissionId && currentDate > this.state.initialReport.deadline
                    ? // Student has an Initial Report available for review
                        <div>
                            <Link className="link" to={"/supervisor/submission/" + this.state.initialReport.submissionId}>
                                Initial Report
                            </Link>
                        </div>
                    :
                        null
                    }
                </td>
                <td style={dataStyle}>
                    {this.state.projectPlanSubmission.submissionDate}
                    <br />
                    {this.state.initialReportSubmission.submissionDate}
                </td>
            </tr>
        )
    }
}