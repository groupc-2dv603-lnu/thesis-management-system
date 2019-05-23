'use strict'

import React, { Component } from 'react';
import { requestSupervisor } from './functions';
import { getStudentData, getUser, getAvailableSupervisors } from './functions';


class SupervisorBox extends Component {
    constructor(props) {
        super(props);

        this.state = { supervisorPopup: false, supervisorName: null };
        this.openSupervisorPopup = this.openSupervisorPopup.bind(this);
        this.closeSupervisorPopup = this.closeSupervisorPopup.bind(this);

        this.studentData = getStudentData();
        this.assignedSupervisor = getUser(this.studentData.supervisorId);
    }

    openSupervisorPopup() {
        this.setState({ supervisorPopup: true });
    }
    
    closeSupervisorPopup() {
        this.setState({ supervisorPopup: false });
    }

    render() {
        return (
            <div>
                <div className="supervisor-box">

                    {!this.studentData.supervisorId ? (
                        <p>
                            You have not yet requested a supervisor. You need to be assigned to a supervisor before your plan can be evaluated
                            <br />
                            <br />
                            <button onClick={() => this.openSupervisorPopup()}>Request supervisor</button>
                        </p>
                    ) : ''}

                    {(this.studentData.supervisorId && !this.studentData.supervisorAssigned) ? (
                        <p>
                            Request for supervisor sent. Awaiting response from {this.assignedSupervisor.name}.
                            <br />
                            <br />
                            <button onClick={() => this.openSupervisorPopup()}>Request new supervisor</button>
                        </p>
                    ) : ''}

                    {this.studentData.supervisorId && this.studentData.supervisorAssigned ? (
                        <p>
                            Supervisor: {this.assignedSupervisor.name}
                        </p>
                    ): ''}

                </div>

                {/* SupervisorPopup */}
                {this.state.supervisorPopup ? (
                    <div className="popup">
                        <SupervisorPopup />
                        <button onClick={() => this.closeSupervisorPopup()}>Close</button>
                    </div>
                ) : ''}
            </div>
        )
    }
}

class SupervisorPopup extends Component {
    constructor(props) {
        super(props);

        this.availableSupervisors = getAvailableSupervisors();
    }
    
    render() {
        const supervisors = this.availableSupervisors.map(sv =>
            <Supervisor key={sv.id} supervisor={sv} />
        );
           
        return (
            <table>
                <tbody>
                    <tr>
                        <th colSpan="2">
                            Available supervisors
                        </th>
                    </tr>
                    {supervisors}
                </tbody>
            </table>
        );
   }
}

class Supervisor extends Component {
	constructor(props) {
		super(props);
		this.state = {supervisors: []};
	}
    render() {
        return (
            <tr>
                <td>
                    {getUser(this.props.supervisor.userId).name}
                </td>
                <td>
                    <button onClick={() => requestSupervisor(this.props.supervisor)}>Request supervisor</button>
                </td>
            </tr>
        )
    }
}

export default SupervisorBox