'use strict'

import React, { Component } from 'react';
import FeedbackList from './feedback';
import * as func from './functions';
import { getUser, putToAPI, fileUpload, formatCamelCaseToText } from './../../functions';
import { grades, dbSubmissionTypeMap } from './../../enums';

export default class Submission extends Component {
    constructor(props) {
        super(props);
        this.state = { showFeedback: false, submissionData: {}, feedbackPopup: false, file: null };

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        // this.fileUpload = this.fileUpload.bind(this)
    }

    onFormSubmit(e) {
        e.preventDefault(); // Stop form submit
        fileUpload(this.state.file, dbSubmissionTypeMap.get(this.props.type)).then(() => {
            this.props.reference.updateAll();
        });
    }
    onChangeFile(e) {
        this.setState({ file: e.target.files[0] })
    }

    componentDidMount() {
        this.updateSubmissionData();
    }

    updateSubmissionData() {
        if (this.props.reportData.submissionId) { // the report will only have a submission tied to it if a file has been uploaded
            func.getSubmissionData(this.props.reportData.submissionId).then(response => {
                this.setState({ submissionData: response.entity })
            })
        }
    }

    setFeedbackPopup(state) {
        // only open popup if feedback data exists
        if (this.props.reportData.feedBackId || (this.props.reportData.feedBackIds && this.props.reportData.feedBackIds.length > 0)) {
            this.setState({ feedbackPopup: state });
        }
    }

    render() {
        let line1, line2, styleClass;

        let currentDate = new Date().toISOString(); // TODO get date from server

        // report graded - counted as finished
        if (this.props.reportData.grade != grades.NOGRADE) {
            line1 = "Status: Graded";
            line2 = "Grade: " + func.capitalizeFirstLetter(this.props.reportData.grade);
            styleClass = "finished";
        }
        // deadline is set (but not graded) == report counted as active
        else if (this.props.reportData.deadLine) {
            line1 = "Status: " + (this.state.submissionData && this.state.submissionData.fileUrl ? "Submitted" : "Not submitted");
            line2 = "Deadline: " + new Date(this.props.reportData.deadLine).toUTCString();
            styleClass = "active";
        }
        else {
            line1 = "N/A"
            styleClass = "disabled";
        }

        return (
            <div>
                <div className={"submission " + styleClass}>
                    <div className="header">{formatCamelCaseToText(this.props.type)}</div>
                    <div className="content">

                        {/* finished or active report */}
                        {this.props.reportData.deadLine != null
                            ?
                            <div>
                                {line1}
                                <br />
                                {line2}

                                {/* has feedback */}
                                {this.props.reportData.feedBackId || (this.props.reportData.feedBackIds && this.props.reportData.feedBackIds.length > 0)
                                    ?
                                    <i style={{ fontSize: "24px" }} className="far fa-comment-alt right link" onClick={() => this.setFeedbackPopup(true)} title="This report has got feedback (click to show)" />
                                    :
                                    null
                                }

                                {/* show file upload for active submission */}
                                {currentDate < this.props.reportData.deadLine && this.props.reportData.grade == grades.NOGRADE
                                    ?
                                    <div>
                                        <p style={{ fontSize: "12px" }}>
                                            {this.state.submissionData.fileUrl ? "You have already submitted a document. Submitting a new document will overwrite the old one" : null}
                                        </p>
                                        <br />
                                        <form onSubmit={this.onFormSubmit}>
                                            <input type="file" id="file" onChange={this.onChangeFile} />
                                            <br />
                                            <button type="submit">Upload</button>
                                        </form>
                                    </div>
                                    :
                                    // deadline passed
                                    this.props.reportData.deadLine && !this.props.reportData.grade
                                        ?
                                        <div style={{ "color": "red" }}>
                                            <br />
                                            Submission deadline has passed. If you missed it, contact your coordinator to open up the submission again
                                        </div>
                                        :
                                        null
                                }
                            </div>
                            :
                            // submission not started
                            <div>
                                {line1}
                            </div>
                        }

                    </div>
                </div>

                {/* Feedback popup */}
                {this.state.feedbackPopup
                    ?
                    <div className="popupOverlay">
                        <div className="innerPopup">
                            <i className="fas fa-window-close link right" onClick={() => this.setFeedbackPopup(false)} title="Close" />
                            <FeedbackList reportData={this.props.reportData} type={this.props.type} />
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        )

    }
}
