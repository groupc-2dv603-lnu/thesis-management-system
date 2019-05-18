'use strict'

import React, { Component } from 'react';
import { requestSupervisor } from './functions';

class SupervisorBox extends Component { 
    constructor(props) {
        super(props);

        this.state = { supervisorPopup: false }
        this.openSupervisorPopup = this.openSupervisorPopup.bind(this);
        this.closeSupervisorPopup = this.closeSupervisorPopup.bind(this);
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

                    <p className={this.props.currentSupervisor ? "hidden" : null}>
                        You have not yet requested a supervisor. You need to be assigned to a supervisor before your plan can be evaluated
                        <br />
                        <br />
                        <button onClick={() => this.openSupervisorPopup()}>Request supervisor</button>
                    </p>

                    <p className={this.props.currentSupervisor && this.props.awaitingSupervisorResponse ? null : "hidden"}>
                        Request for supervisor sent. Awaiting response from {this.props.currentSupervisor.name}.
                        <br />
                        <br />
                        <button onClick={() => this.openSupervisorPopup()}>Request new supervisor</button>
                    </p>

                    <p className={this.props.currentSupervisor && !this.props.awaitingSupervisorResponse ? null : "hidden"}>
                        Supervisor: {this.props.currentSupervisor.name}
                    </p>

                </div>

                {/* SupervisorPopup */}
                <div className={"popup " + (this.state.supervisorPopup ? null : "hidden")}>
                    <SupervisorPopup supervisors={this.props.supervisors}/>
                    <button onClick={() => this.closeSupervisorPopup()}>Close</button>
                </div>
            </div>
        )
    }
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
   render() {
       return (
           <tr>
               <td>
                   {this.props.supervisor.name}
               </td>
               <td>
                   <button onClick={() => requestSupervisor(this.props.supervisor)}>Request supervisor</button>
               </td>
           </tr>
       )
   }
}

export default SupervisorBox