'use strict'

import React, { Component } from 'react'
import * as functions from './functions';

export default class Supervisor extends Component {

    constructor(props) {
        super(props);

        this.state = { studentsApplied: [], supervisedStudents: [] };
    }

    componentDidMount() {
        functions.getAppliedStudents().then(response => {
            this.setState({ studentsApplied: response.entity._embedded.students })
        });

        functions.getSupervisedStudents().then(response => {
            this.setState({ supervisedStudents: response.entity._embedded.students })
        });
    }

    render() {
        const studentRequests = this.state.studentsApplied.map(student =>
            <StudentRequest key={student.id} {...student}/>
        )

        const supervisedStudents = this.state.supervisedStudents.map(student =>
            <SupervisedStudent key={student.id} {...student}/>
        )
        
        return (
            <div>
                <table className="supervisor-box">
                    <tbody>
                        {studentRequests}
                    </tbody>
                </table>
                <br/>
                <table>
                    <tbody>
                        <tr>
                            <th>
                                Supervisor for
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

    componentDidMount() {
        functions.getUser(this.props.userId).then(response => {
            this.setState({ user: response }) //.entity
        });
    }

    render() {
        return (
            <tr>
                <td style={{width:'100%'}}>
                    {this.state.user.name} has applied to get you as supervisor
                </td>
                <td style={{'whiteSpace':'nowrap'}}>
                    <button onClick={() => functions.acceptRequest(this.state.user)}>Accept</button>
                    <button onClick={() => functions.rejectRequest(this.state.user)}>Decline</button>
                </td>
            </tr>
        )
    }
}

class SupervisedStudent extends Component {

    constructor(props) {
        super(props);

        this.state = { user: {} };
    }

    componentDidMount() {
        functions.getUser(this.props.userId).then(response => {
            this.setState({ user: response }) //.entity
        });
    }
    
    render()  {
        return (
            <tr>
                <td>
                    {this.state.user.name}
                </td>
            </tr>
        )
    }
}