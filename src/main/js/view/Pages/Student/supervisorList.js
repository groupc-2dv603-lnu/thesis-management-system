'use strict'

import React, { Component } from 'react';
import { requestSupervisor } from './functions';

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

export default SupervisorPopup