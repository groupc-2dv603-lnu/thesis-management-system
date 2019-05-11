// TODO
// ev dela upp filen. den börjar bli ganska stor

'use strict';

import React, { Component } from 'react'
const client = require('../../../client');

class Student extends Component {
    constructor(props) {
        super(props);
        this.state = { supervisorPopup: false, };
        this.openSupervisorPopup = this.openSupervisorPopup.bind(this);
        this.closeSupervisorPopup = this.closeSupervisorPopup.bind(this);
      
        //mocks
        this.supervisor = "Diego Perez";
        this.awaitingSupervisorResponse = true;

        this.projectDescription = { 
            type: "project description", 
            // status: "finished", 
            grade: "pass",
            fileURL: "a_url", 
            deadline: "2019-05-14T23:55",
            submissionDate: "2019-05-03T23:55",
        };
        this.projectPlan = { 
            type: "project plan", 
            // status: "active", 
            grade: "Pass", 
            fileURL: "a_url", 
            deadline: "2019-05-09T23:55",
            submissionDate: null,
        };
        this.initialReport = { 
            type: "initial report", 
            // status: "disabled", 
            grade: null,
            fileURL: null,
            deadline: "2019-05-20T10:00",
            submissionDate: null,
        };
        this.finalReport = { 
            type: "final report", 
            // status: "disabled",
            grade: null, 
            fileURL: null, 
            deadline: null,
            submissionDate: null,
        };

        this.supervisors = [
            { id: "1", name: "Diego Perez" },
            { id: "2", name: "Mauro Caporuscio" },
            { id: "3", name: "Some Guy" },
        ];
    }
   
    openSupervisorPopup() {
        this.setState({supervisorPopup: true});
    };
    
    closeSupervisorPopup() {
        this.setState({supervisorPopup: false});
    }

    // componentDidMount() {
    //     client({ method: 'GET', path: '/users' }).then(response => {
    //         this.setState({ users: response.entity._embedded.users });
    //     });
    // }

    render() {
        return (
            <div>
                {/* Supervisor box */}
               <div className="supervision-box">

                    <p className={this.supervisor ? "hidden" : null}>
                        You have not yet requested a supervisor. You need to be assigned to a supervisor before your plan can be evaluated
                        <br />
                        <br />
                        <button onClick={this.openSupervisorPopup}>Request supervisor</button>
                    </p>

                    <p className={this.supervisor && this.awaitingSupervisorResponse ? null : "hidden"}>
                        Request for supervisor sent. Awaiting response from {this.supervisor}.
                        <br />
                        <br />
                        <button onClick={this.openSupervisorPopup}>Request new supervisor</button>
                    </p>

                    <p className={this.supervisor && !this.awaitingSupervisorResponse ? null : "hidden"}>
                        Supervisor: {this.supervisor}
                    </p>
                </div>

                {/* Choose supervisor popup */}
                <div className={"popup " + (this.state.supervisorPopup ? null : "hidden")}>
                    <SupervisorPopup supervisors={this.supervisors}/>
                    <button onClick={this.closeSupervisorPopup}>Close</button>
                </div>
                
                {/* Submissions */}
                <h2>Thesis Submissions</h2>
                <Submission {...this.projectDescription} />
                <Submission {...this.projectPlan} />
                <Submission {...this.initialReport} />
                <Submission {...this.finalReport} />
            </div>
        )
    }

}

class Submission extends Component {

    uploadFile(file) {
        //TODO unfinished
        console.log("uploading file", file);
    }

    render() {
        let line1, line2, line3, styleClass;
        
        let currentDate = new Date().toISOString();

        // submission graded
        if(this.props.grade != null) {
            line1 = "Status: Graded";
            line2 = "Grade: " + capitalizeFirstLetter(this.props.grade);
            styleClass = "finished";
        }
        // deadline is set (submission counted as active)
        else if(this.props.deadline) {
            line1 = "Status: " + (this.props.fileURL ? "Submitted" : "Not submitted");
            line2 = "Deadline: " + new Date(this.props.deadline).toUTCString();
            styleClass = "active";
            // submission delayed
            // if(currentDate >= this.props.deadline && this.props.fileURL == null)
            //     line3 = " Submission delayed";
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
                            {/* <div style={{"color": "red"}}>
                                {line3}
                            </div> */}
                            {/* show file upload for active submission */}
                            {currentDate < this.props.deadline && !this.props.grade ? (
                                <div>
                                    <br />
                                    <input type="file" id="file"/>
                                    <br/>
                                    <button onClick={() => this.uploadFile(document.getElementById("file").files[0])}>Upload</button>
                                </div>
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

function capitalizeFirstLetter(string) {
    if(string == null)
        return "N/A";
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class SupervisorPopup extends Component {
     render() {
         const supervisors = this.props.supervisors.map(sv =>
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

    requestSupervisor(supervisor) {
        //TODO unfinished
        console.log("Requesting " + supervisor.name + "(" + supervisor.id + ") as supervisor");
    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.supervisor.name}
                </td>
                <td>
                    <button onClick={() => this.requestSupervisor(this.props.supervisor)}>Request supervisor</button>
                </td>
            </tr>
        )
    }
}

export default Student