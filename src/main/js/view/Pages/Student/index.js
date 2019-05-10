'use strict';

import React, { Component } from 'react'
const client = require('../../../client');

class Student extends Component {
    constructor(props) {
        super(props);
        this.state = { supervisorPopup: false };
        this.openSupervisorPopup = this.openSupervisorPopup.bind(this);
        this.closeSupervisorPopup = this.closeSupervisorPopup.bind(this);
      
        //mock
        this.supervisor = "Diego Perez";
        this.awaitingSupervisorResponse = true;

        this.projectDescription = { 
            type: "project description", 
            // status: "finished", 
            grade: "pass",
            fileURL: "a_url", 
            deadline: "2019-05-14 23:55",
            // deadline: "Sun 14th of May 23:55", 
            submissionDate: "2019-05-03 23:55",
            // submissionDate: "Fri 3rd of May 16:35",
        };
        this.projectPlan = { 
            type: "project plan", 
            // status: "active", 
            grade: "Pass", 
            fileURL: "a_url", 
            deadline: "2019-05-09 23:55",
            // deadline: "Sun 26th of May 23:55",
            submissionDate: null,
        };
        this.initialReport = { 
            type: "initial report", 
            // status: "disabled", 
            grade: null,
            fileURL: null,
            deadline: "2019-05-20 10:00",
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
                    <SupervisorPopup />
                    <button onClick={this.closeSupervisorPopup}>Close</button>
                </div>
                

                {/* Submissions */}
                <h2>Thesis Submissions</h2>

                {/* 1. Project Description */}
                <Submission {...this.projectDescription} />
                {/* <div className={"submission " + this.projectDescription.status}>
                    <div className="header">Project description</div>
                    <div className="content">
                        <div className={this.projectDescription.status == "disabled" ? "hidden" : null}>
                            Status: {this.capitalize(this.projectDescription.status)}
                            <br />
                            Grade: {this.projectDescription.grade}
                        </div>
                    </div>
                </div> */}

                {/* 2. Project Plan */}
                <Submission {...this.projectPlan} />
                {/* <div className={"submission " + this.projectPlan.status}>
                    <div className="header active">Project plan</div>
                    <div className="content active">
                        <div className={this.projectDescription.status == "disabled" ? "hidden" : null}> 
                            Status: Not submitted
                            <br/>
                            Deadline: Sun 26th of May 23:55
                            <br/>
                            <input type="file"/>
                        </div>
                    </div>
                </div> */}

                {/* 3. Initial report */}
                <Submission {...this.initialReport} />
                {/* <div className={"submission " + this.initialReport.status}>
                    <div className="header">Initial report</div>
                    <div className="content">
                        N/A
                    </div>
                </div> */}

                {/* 4. Final report */}
                <Submission {...this.finalReport} />
                {/* <div className={"submission " + this.finalReport.status}>
                    <div className="header">Final report</div>
                    <div className="content">
                        N/A
                    </div>
                </div> */}

            </div>
        )
    }

}

class Submission extends Component {
    render() {
        let line1, line2, line3, fileUpload, styleClass;
        let currentDate = "2019-05-10 12:44"

        // submission graded
        if(this.props.grade != null) {
            line1 = "Status: Graded";
            line2 = "Grade: " + capitalizeFirstLetter(this.props.grade);
            styleClass = "finished";
        }
        // deadline is set (submission counted as active)
        else if(this.props.deadline) {
            line1 = "Status: " + (this.props.fileURL ? "Submitted" : "Not submitted");
            line2 = "Deadline: " + this.props.deadline; //new Date().format('dd-mm-yy'); //this.props.deadline;
            styleClass = "active";
            // submission delayed
            if(currentDate >= this.props.deadline && this.props.fileURL == null)
                line3 = " Submission delayed";
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
                            <div style={{"color": "red"}}>
                                {line3}
                            </div>
                            {/* show file upload for active submission */}
                            {this.props.deadline && !this.props.grade ? (
                                <div>
                                    <br />
                                    <input type="file" />
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

function formatDate(date) {
    return "Fri 3rd of May 16:35";
    // const moment = require('moment')
    // moment().format('DD [of] MMM hh:mm');
}

class SupervisorPopup extends Component {
     render() {
        return (
            <table>
                <tbody>
                    <tr>
                        <th colSpan="2">
                            Available supervisors
                        </th>
                    </tr>
                    <tr>
                        <td>
                            Diego Perez 
                        </td>
                        <td>
                            <button>Request supervisor</button> 
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Mauro Caporuscio
                        </td>
                        <td>
                            <button>Request supervisor</button> 
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Some Guy
                        </td>
                        <td>
                            <button>Request supervisor</button> 
                        </td>
                    </tr>
                </tbody>
            </table>
       );
    }
}

export default Student