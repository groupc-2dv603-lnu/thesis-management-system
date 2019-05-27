'use strict'

import React, { Component } from 'react';
import * as func from './functions';

class SupervisorBox extends Component {
    constructor(props) {
        super(props);

        this.state = { supervisorPopup: false, studentData: {}, assignedSupervisor: {} };
        this.openSupervisorPopup = this.openSupervisorPopup.bind(this);
        this.closeSupervisorPopup = this.closeSupervisorPopup.bind(this);

    }
    
    componentDidMount() {
        func.getStudentData().then(studentResponse => {
            this.setState({ studentData: studentResponse.entity });
            // this.setState({ assignedSupervisor: { name: "Mr Pacman" }})
            func.getUser(studentResponse.entity.supervisorId).then(supervisorResponse => {
                this.setState({ assignedSupervisor: supervisorResponse.entity })
            })
        });

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

                    {!this.state.studentData.supervisorId ? (
                        <p>
                            You have not yet requested a supervisor. You need to be assigned to a supervisor before your plan can be evaluated
                            <br />
                            <br />
                            <button onClick={() => this.openSupervisorPopup()}>Request supervisor</button>
                        </p>
                    ) : ''}

                    {(this.state.studentData.supervisorId && !this.state.studentData.supervisorAssigned) ? (
                        <p>
                            Request for supervisor sent. Awaiting response from {this.state.assignedSupervisor.name}.
                            {/* <br />
                            <br />
                            <button onClick={() => this.openSupervisorPopup()}>Request new supervisor</button> */}
                        </p>
                    ) : ''}

                    {this.state.studentData.supervisorId && this.state.studentData.supervisorAssigned ? (
                        <p>
                            Supervisor: {this.state.assignedSupervisor.name}
                        </p>
                    ): ''}

                </div>

                {/* SupervisorPopup */}
                {this.state.supervisorPopup ? (
                    <div className="popup">
                        <i className="fas fa-window-close link right" onClick={() => this.closeSupervisorPopup()} />
                        <SupervisorPopup studentData={this.state.studentData} />
                        <br/>
                        <div style={{"color": "red"}}>
                            {this.state.studentData.supervisorId ? "Cannot request new supervisor until previous request has been answered" : null}
                        </div>
                        {/* <br/>
                        <button onClick={() => this.closeSupervisorPopup()}>Close</button> */}
                    </div>
                ) : ''}
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
            <Supervisor key={sv.userId} supervisor={sv} studentData={this.props.studentData} />
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
                    <button disabled={this.props.studentData.supervisorId} onClick={() => func.requestSupervisor(this.props.supervisor)}>
                    {/* <button disabled={this.props.studentData.supervisorId== this.props.supervisor.userId} onClick={() => func.requestSupervisor(this.props.supervisor)}>  */}
                        {this.props.studentData.supervisorId == this.props.supervisor.userId ? 'Awaiting response...' : 'Request supervisor'}
                    </button>
                </td>
            </tr>
        )
    }
}

export default SupervisorBox