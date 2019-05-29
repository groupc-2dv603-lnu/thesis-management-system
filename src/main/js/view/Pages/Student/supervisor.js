'use strict'

import React, { Component } from 'react';
import * as func from './functions';


const pendingSupervisor = { denied: "DENIED", none: "NONE", awaiting: "AWAITING", accepted: "ACCEPTED" } //enum

class SupervisorBox extends Component {
    constructor(props) {
        super(props);

        this.state = { supervisorPopup: false, studentData: {}, assignedSupervisor: {} };
        this.openSupervisorPopup = this.openSupervisorPopup.bind(this);
        this.closeSupervisorPopup = this.closeSupervisorPopup.bind(this);

    }
    
    componentDidMount() {
        this.updateStudentData();
    }

    updateStudentData() {
        func.getStudentData().then(studentResponse => {
            this.setState({ studentData: studentResponse.entity });
            func.getUser(studentResponse.entity.assignedSupervisorId).then(supervisorResponse => {
                this.setState({ assignedSupervisor: supervisorResponse.entity })
            })
        });
    }

    requestSupervisor(supervisor) {
        func.requestSupervisor(supervisor)
        .then(() => this.updateStudentData());
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
                    {/* No supervisor */}
                    {!this.state.studentData.assignedSupervisorId ?
                        <p>
                            You have not yet requested a supervisor. You need to be assigned to a supervisor before your plan can be evaluated
                            <br />
                            <br />
                            <button onClick={() => this.openSupervisorPopup()}>Request supervisor</button>
                        </p>
                    : 
                        // Previous supervisor request denied
                        this.state.studentData.assignedSupervisorId && this.state.studentData.pendingSupervisor == pendingSupervisor.denied ?
                            <p>
                                {this.state.assignedSupervisor.name} denied your request. You need to be assigned to a supervisor before your plan can be evaluated
                                <br />
                                <br />
                                <button onClick={() => this.openSupervisorPopup()}>Request new supervisor</button>
                            </p>
                        :
                            // Awaiting supervisor response
                            this.state.studentData.assignedSupervisorId && this.state.studentData.pendingSupervisor == pendingSupervisor.awaiting ?
                                <p>
                                    Request for supervisor sent. Awaiting response from {this.state.assignedSupervisor.name}.
                                </p>
                            :
                                // Supervisor assigned
                                <p>
                                    Supervisor: {this.state.assignedSupervisor.name}
                                </p>
                    }

                </div>

                {/* SupervisorPopup */}
                {this.state.supervisorPopup ?
                    <div className="popup">
                        <i className="fas fa-window-close link right" onClick={() => this.closeSupervisorPopup()} />
                        <SupervisorPopup studentData={this.state.studentData} reference={this}/>
                        <br/>
                        <div style={{"color": "red"}}>
                            {this.state.studentData.assignedSupervisorId && this.state.studentData.pendingSupervisor != pendingSupervisor.denied ? "Request sent. Cannot request a new supervisor until this request has been answered" : null}
                        </div>
                    </div>
                : 
                    null
                }
            </div>
        )
    }
}

class SupervisorPopup extends Component {
    constructor(props) {
        super(props);

        this.state = { availableSupervisors: [] };
    }

    componentDidMount() {
        func.getAvailableSupervisors().then(response => {
            this.setState({ availableSupervisors: response.entity._embedded.supervisors });
        });
    }

    render() {
        const supervisors = this.state.availableSupervisors.map(sv =>
            <Supervisor key={sv.userId} supervisor={sv} studentData={this.props.studentData} reference={this.props.reference}/>
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

        this.state = { user: {} }
    }

    componentDidMount() {
        func.getUser(this.props.supervisor.userId).then(userResponse => {
            this.setState({ user: userResponse.entity });
        })
    }

    render() {
        return (
            <tr>
                <td>
                    {this.state.user.name}
                </td>
                <td>
                    <button disabled={this.props.studentData.assignedSupervisorId && this.props.studentData.pendingSupervisor != pendingSupervisor.denied} onClick={() => this.props.reference.requestSupervisor(this.props.supervisor)}>
                    {/* <button disabled={this.props.studentData.assignedSupervisorId== this.props.supervisor.userId} onClick={() => func.requestSupervisor(this.props.supervisor)}>  */}
                        {this.props.studentData.assignedSupervisorId == this.props.supervisor.userId && this.props.studentData.pendingSupervisor != pendingSupervisor.denied ? 'Awaiting response...' : 'Request supervisor'}
                    </button>
                </td>
            </tr>
        )
    }
}

export default SupervisorBox