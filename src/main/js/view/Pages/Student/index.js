// TODO
// view feedback

'use strict';

import React, { Component } from 'react';
import { capitalizeFirstLetter, uploadFile } from './functions';
import SupervisorPopup from './supervisorList';
import StudentMocks from './mocks';

// const f = require('./functions.js');

class Student extends Component {
    constructor(props) {
        super(props);

        this.state = { supervisorPopup: false}
        this.openSupervisorPopup = this.openSupervisorPopup.bind(this);
        this.closeSupervisorPopup = this.closeSupervisorPopup.bind(this);

        this.studentData = new StudentMocks();
        this.supervisorPopup = false;
    }

    openSupervisorPopup() {
        this.setState({ supervisorPopup: true });
    }
    
    closeSupervisorPopup() {
        this.setState({ supervisorPopup: false });
    }

    // componentDidMount() {
    //     client({ method: 'GET', path: '/users' }).then(response => {
    //         this.setState({ users: response.entity._embedded.users });
    //     });
    // }

    render() {
        return (
            <div>
                {/* Supervision box */}
                <div className="supervision-box">

                    <p className={this.studentData.currentSupervisor ? "hidden" : null}>
                        You have not yet requested a supervisor. You need to be assigned to a supervisor before your plan can be evaluated
                        <br />
                        <br />
                        <button onClick={() => this.openSupervisorPopup()}>Request supervisor</button>
                    </p>

                    <p className={this.studentData.currentSupervisor && this.studentData.awaitingSupervisorResponse ? null : "hidden"}>
                        Request for supervisor sent. Awaiting response from {this.studentData.currentSupervisor.name}.
                        <br />
                        <br />
                        <button onClick={() => this.openSupervisorPopup()}>Request new supervisor</button>
                    </p>

                    <p className={this.studentData.currentSupervisor && !this.studentData.awaitingSupervisorResponse ? null : "hidden"}>
                        Supervisor: {this.studentData.currentSupervisor.name}
                    </p>

                </div>

                {/* SupervisorPopup */}
                <div className={"popup " + (this.state.supervisorPopup ? null : "hidden")}>
                    <SupervisorPopup supervisors={this.studentData.supervisors}/>
                    <button onClick={() => this.closeSupervisorPopup()}>Close</button>
                </div>

                {/* Submissions */}
                <h2>Thesis Submissions</h2>
                <Submission {...this.studentData.projectDescription} />
                <Submission {...this.studentData.projectPlan} />
                <Submission {...this.studentData.initialReport} />
                <Submission {...this.studentData.finalReport} />
            </div>
        )
    }

}


class Submission extends Component {

    render() {
        let line1, line2, styleClass;
        
        let currentDate = new Date().toISOString(); // TODO get date from server

        // submission graded
        if(this.props.grade != null) {
            line1 = "Status: Graded";
            line2 = "Grade: " + capitalizeFirstLetter(this.props.grade);
            styleClass = "finished";
        }
        // deadline is set (but not graded) == submission counted as active
        else if(this.props.deadline) {
            line1 = "Status: " + (this.props.fileURL ? "Submitted" : "Not submitted");
            line2 = "Deadline: " + new Date(this.props.deadline).toUTCString();
            styleClass = "active";
        }
        else {
            line1 = "N/A"
            styleClass = "disabled";
        }

        return (
            <div className={"submission " + styleClass}>
                <div className="header">{capitalizeFirstLetter(this.props.type)}</div>
                <div className="content">
                    {this.props.status != "disabled" ? (
                        <div>
                            {line1}
                            <br />
                            {line2}
                            {/* show file upload for active submission */}
                            {currentDate < this.props.deadline && !this.props.grade ? (
                                <div>
                                    <br />
                                    <input type="file" id="file"/>
                                    <br/>
                                    <button onClick={() => uploadFile(document.getElementById("file").files[0])}>Upload</button>
                                </div>
                            // deadline passed
                            ) : (this.props.deadline && !this.props.grade) ? (
                                    <div style={{"color":"red"}}>
                                        <br/>
                                        Submission deadline has passed. If you missed it, contact your coordinator to open up the submission again
                                    </div>
                            ) : ''}
                        </div>
                    ) : (
                        <div>
                            {line1}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Student