//TODO dela upp i fler filer
//TODO design
//TODO använd inte lokal tid

'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as func from './functions'
import { getUser } from './../../functions';
import * as styles from './styles';

export default class Supervisor extends Component {
    
    constructor(props) {
        super(props);

        this.state = { studentsApplied: [], supervisedStudents: [] };
    }

    componentDidMount() {
        func.getAppliedStudents().then(response => {
            this.setState({ studentsApplied: response.entity._embedded.students })
        });

        func.getSupervisedStudents().then(response => {
            this.setState({ supervisedStudents: response.entity._embedded.students })
        });
    }

    render() {
        const studentRequests = this.state.studentsApplied.map(student =>
            <StudentRequest key={student.id} student={student}/>
        )

        const supervisedStudents = this.state.supervisedStudents.map(student =>
            <SupervisedStudent key={student.id} student={student}/>
        )
    
        return (
            <div>
                <table className="supervisor-box">
                    <tbody>
                        {studentRequests}
                    </tbody>
                </table>

                <br/>

                Student you supervise
                <div style={styles.studentList}>
                    <table width="100%">
                        <tbody>
                            <tr style={{textAlign: "left"}}>
                                <th style={{verticalAlign: "top"}}>
                                    Student
                                </th>
                                <th>
                                    Submissions available for review
                                </th>
                                <th>
                                    e-mail
                                </th>
                            </tr>
                            {supervisedStudents}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}


class StudentRequest extends Component {

    constructor(props) {
        super(props);

        this.state = { user: {} };
    }

    componentDidMount() {
        func.getMockUser(this.props.student.userId).then(response => {
            this.setState({ user: response }) 
        });
    }

    render() {
        return (
            <tr>
                <td style={{width:'100%'}}>
                    {this.state.user.name} has applied to get you as supervisor
                </td>
                <td style={{'whiteSpace':'nowrap'}}>
                    <button onClick={() => func.acceptRequest(this.props.student)}>Accept</button>
                    <button onClick={() => func.rejectRequest(this.props.student)}>Decline</button>
                </td>
            </tr>
        )
    }
}

class SupervisedStudent extends Component {

    constructor(props) {
        super(props);

        this.state = { user: {}, projectPlan: {}, initialReport: {} };
    }

    componentDidMount() {
        func.getMockUser(this.props.student.userId).then(response => {
            this.setState({ user: response })
        });

        func.getUserProjectPlan(this.props.student.userId).then(response => {
            if(response)
                this.setState({ projectPlan: response }); //.entity._embedded.submissions
        })
        
        func.getUserInitialReport(this.props.student.userId).then(response => {
            if(response)
                this.setState({ initialReport: response }); //.entity._embedded.submissions
        })
        
    }
    

    render()  {
        let currentDate = new Date().toISOString();
 
        return (
            <tr>
                <td>
                    {this.state.user.name}
                </td>
                <td>
                    {(this.state.projectPlan.submissionId && currentDate > this.state.projectPlan.deadline) ?
                        <div>
                            <Link to={"/supervisor/submission/" + this.state.projectPlan.submissionId}>
                                Project Plan
                            </Link>
                            <br/>
                        </div>
                    : null }
                    {(this.state.initialReport.submissionId && currentDate > this.state.initialReport.deadline) ?
                        <div>
                            <Link to={"/supervisor/submission/" + this.state.initialReport.submissionId}>
                                Initial Report
                            </Link>
                        </div>
                    : null }
                </td>
                <td>
                    {this.state.user.emailAdress}
                </td>
            </tr>
        )
    }
}