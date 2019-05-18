'use strict'

import React, { Component } from 'react';
import { capitalizeFirstLetter, uploadFile } from './functions';

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
export default Submission