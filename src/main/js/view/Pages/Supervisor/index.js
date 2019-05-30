//TODO design
//TODO använd inte lokal tid
//TODO (allmän) använd globala enums

'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as func from './functions'
import { getUser } from './../../functions';
// import './styles.css';

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
        func.getAppliedStudents().then(response => {
            this.setState({ studentsApplied: response.entity._embedded.students })
        });

        func.getSupervisedStudents().then(response => {
            this.setState({ supervisedStudents: response.entity._embedded.students })
        });
    }

    render() {
        let order = 0;
        const studentRequests = this.state.studentsApplied.map(student =>
            <StudentRequest order={order ++} key={student.userId} student={student}/>
        )
        
        order = 0;
        const supervisedStudents = this.state.supervisedStudents.map(student =>
            <SupervisedStudent order={order ++} key={student.userId} student={student}/>
        )
    
        return (
            <div>
                {/* List of student requests */}
                <table cellSpacing="1" style={{backgroundColor: "#eaeaea"}}>{/*className="supervisor-box"*/}
                    <tbody>
                        {studentRequests}
                    </tbody>
                </table>

                {/* List of assigned student */}
                <h2>Student you supervise</h2>
                {/* <div style={styles.studentList}> */}
                    <table width="100%" cellSpacing="0" style={{verticalAlign: "top"}}>
                        <tbody>
                            <tr style={{textAlign: "left", backgroundColor: "#ffe000"}}>
                                <th style={{verticalAlign: "top", padding: "10px 15px"}}>
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
            // </div>
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
        // let rowColour;
        // if(this.props.order % 2 == 0)
        //     rowColour = "#f0f0f0";
        // else
        //     rowColour = "#fff";

        return (
            <tr>
                <td style={{padding: "10px 15px"}}>
                    {this.state.user.name} wants you as supervisor
                </td>
                <td style={{whiteSpace: "nowrap"}}>
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

        let rowColour;
        if(this.props.order % 2 == 0)
            rowColour = "#f0f0f0";
        else
            rowColour = "#fff";
        
        return (
            <tr style={{backgroundColor: rowColour}}>
                <td style={dataStyle}>
                    {this.state.user.name}
                </td>
                <td style={dataStyle}>
                    {this.state.projectPlan.submissionId && currentDate > this.state.projectPlan.deadline
                    ? // Student has a Project Plan available for review
                    <div>
                            <Link style={{textDecoration: "underline"}} to={"/supervisor/submission/" + this.state.projectPlan.submissionId}>
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
                            <Link to={"/supervisor/submission/" + this.state.initialReport.submissionId}>
                                Initial Report
                            </Link>
                        </div>
                    :
                        null
                    }
                </td>
                <td style={dataStyle}>
                    {this.state.projectPlanSubmission.submissionDate}
                </td>
                <td style={dataStyle}>
                    {this.state.initialReportSubmission.submissionDate}
                </td>
            </tr>
        )
    }
}