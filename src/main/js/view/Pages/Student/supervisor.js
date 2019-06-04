'use strict'

import React, { Component } from 'react';
import { loader } from './../../functions';
import * as func from './functions';

const pendingSupervisor = { denied: "DENIED", none: "NONE", awaiting: "AWAITING", accepted: "ACCEPTED" } //enum

class SupervisorBox extends Component {
    constructor(props) {
        super(props);

        this.state = { supervisorPopup: false, studentData: {}, assignedSupervisor: {}, isLoaded: false };
        this.openSupervisorPopup = this.openSupervisorPopup.bind(this);
        this.closeSupervisorPopup = this.closeSupervisorPopup.bind(this);
    }

    componentDidMount() {
        this.getStudentData();
    }

    getStudentData() {
        func.getStudentData().then(studentResponse => {
            this.setState({ studentData: studentResponse.entity });
            func.getUser(studentResponse.entity.assignedSupervisorId).then(supervisorResponse => {
                this.setState({ assignedSupervisor: supervisorResponse.entity, isLoaded: true })
            })
        });
    }

    requestSupervisor(supervisor) {
        func.requestSupervisor(supervisor)
            .then(() => this.getStudentData());
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
                <div className="supervisorBox">
                    {!this.state.isLoaded
                        ? loader
                        : !this.state.studentData.assignedSupervisorId // No supervisor 
                            ?
                            <p>
                                You have not yet requested a supervisor. You need to be assigned to a supervisor before your plan can be evaluated
                            <br />
                                <br />
                                <button onClick={() => this.openSupervisorPopup()}>Request supervisor</button>
                            </p>
                            :
                            // Previous supervisor request denied
                            this.state.studentData.assignedSupervisorId && this.state.studentData.pendingSupervisor == pendingSupervisor.denied
                                ?
                                <p>
                                    {this.state.assignedSupervisor.name} denied your request. You need to be assigned to a supervisor before your plan can be evaluated
                                <br />
                                    <br />
                                    <button onClick={() => this.openSupervisorPopup()}>Request new supervisor</button>
                                </p>
                                :
                                // Awaiting supervisor response
                                this.state.studentData.assignedSupervisorId && this.state.studentData.pendingSupervisor == pendingSupervisor.awaiting
                                    ?
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
                    <div className="popupOverlay">
                        <div className="innerPopup">
                            <i className="fas fa-window-close link right" onClick={() => this.closeSupervisorPopup()} />
                            <SupervisorList studentData={this.state.studentData} reference={this} />
                            {this.state.studentData.assignedSupervisorId && this.state.studentData.pendingSupervisor != pendingSupervisor.denied
                                ?
                                <div style={{ "color": "red" }}>
                                    <br />
                                    Request sent. Cannot request a new supervisor until this request has been answered
                                    </div>
                                :
                                null
                            }
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}

class SupervisorList extends Component {
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
            <Supervisor key={sv.userId} supervisor={sv} studentData={this.props.studentData} reference={this.props.reference} />
        );

        return (
            <div>
                <div className="center" style={{ fontWeight: "bold" }}>
                    Available supervisors
                </div>
                <table>
                    <tbody>
                        {supervisors}
                    </tbody>
                </table>
            </div>
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
                <td className="right nowrap">
                    <button disabled={this.props.studentData.assignedSupervisorId && this.props.studentData.pendingSupervisor != pendingSupervisor.denied} onClick={() => this.props.reference.requestSupervisor(this.props.supervisor)}>
                        {this.props.studentData.assignedSupervisorId == this.props.supervisor.userId && this.props.studentData.pendingSupervisor != pendingSupervisor.denied ? 'Awaiting response...' : 'Request supervisor'}
                    </button>
                </td>
            </tr>
        )
    }
}

export default SupervisorBox