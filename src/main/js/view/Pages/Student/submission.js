'use strict'

import React, { Component } from 'react';
import * as func from './functions';
import { capitalizeFirstLetter, getUser } from './../../functions';
import { grades, dbType } from './../../enums';
import axios from 'axios';

class Submission extends Component {

    constructor(props) {
        super(props);
        this.state = { showFeedback: false, submissionData: {}, feedbackPopup: false, file: null };
 
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.fileUpload = this.fileUpload.bind(this)
    }

    onFormSubmit(e) {
        e.preventDefault(); // Stop form submit
        this.fileUpload(this.state.file).then(response=>{
            console.log(response.data);
        })
    }
    onChangeFile(e) {
        this.setState({file: e.target.files[0]})
    }
    fileUpload(file, dbType) {
        const url = '/student/newSubmission?subType=PRJ_PLAN';
        const formData = new FormData();
        formData.append('file', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        return axios.post(url, formData, config)
    }


    componentDidMount() {
        // console.log(this.props.type, this.props.reportData.submissionId)
        this.updateSubmissionData();
    }

    updateSubmissionData() {
        if (this.props.reportData.submissionId) { // the report will only have a submission tied to it if a file has been uploaded
            console.log("updating submission data")
            func.getSubmissionData(this.props.reportData.submissionId).then(response => {
                // console.log(response.entity)
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

        // submission graded
        if (this.props.reportData.grade != grades.NOGRADE) {
            // if(this.props.submissionData && this.props.submissionData.submissionStatus == submissionStatus.FINISHED) {
            line1 = "Status: Graded";
            line2 = "Grade: " + func.capitalizeFirstLetter(this.props.reportData.grade);
            styleClass = "finished";
        }
        // deadline is set (but not graded) == submission counted as active
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
                    <div className="header" onClick={() => this.setFeedbackPopup(true)}>{capitalizeFirstLetter(this.props.type)}</div>
                    <div className="content">

                        {/* finished or active submission */}
                        {this.props.reportData.deadLine != null
                            ?
                            <div>
                                {line1}
                                <br />
                                {line2}
                                {/* show file upload for active submission */}
                                {currentDate < this.props.reportData.deadLine && this.props.reportData.grade == grades.NOGRADE
                                    ?
                                    <div>
                                        <p style={{ fontSize: "12px" }}>
                                            {this.state.submissionData.fileUrl ? "You have already submitted a document. Submitting a new document will overwrite the old one" : null}
                                        </p>
                                        <br />
                                        <form onSubmit={this.onFormSubmit}>
                                            <input type="file" id="file" onChange={this.onChangeFile}/>
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
                            <FeedbackList reportData={this.props.reportData} />
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        )

    }
}

class FeedbackList extends Component {

    constructor(props) {
        super(props);
        this.state = { activeFeedback: null }; //feedbackArr: [],
    }

    componentDidMount() {
        // single feedback entity (project plan)
        if (this.props.reportData.feedBackId) {
            func.getFeedback(this.props.reportData.feedBackId).then(response => {
                this.setState({ activeFeedback: response.entity });
            });
        }
        else if (this.props.reportData.feedBackIds) {
            this.setActiveFeedback(0);
        }

        // feedback array (initial report, and for some reason final report)
        // else if (this.props.reportData.feedBackIds) {
        //     let tempArr = [];
        //     this.props.reportData.feedBackIds.forEach(feedbackId => {
        //         func.getFeedback(feedbackId).then(response => {
        //             tempArr.push(response.entity);
        //             this.setState({ feedbackArr: tempArr }); // TODO shouldn't update y setting state for every push
        //         })
        //     })
        // }
    }


    setActiveFeedback(index) {
        func.getFeedback(this.props.reportData.feedBackIds[index]).then(response => {
            console.log(response.entity)
            this.setState({ activeFeedback: response.entity });
        });
    }

    render() { //TODO could probably refactor a little and remove some code duplication       
        // let feedbackItems = this.state.feedbackArr.map(obj =>
        //     <div key={obj._links.self.href}>
        //         <br />
        //         <br />
        //         <Feedback {...obj} />
        //     </div>
        // );

        // if(this.state.feedback) {
        //     feedbackItems.push(
        //         <div key={this.state.feedback._links.self.href}>
        //             <br />
        //             <br />
        //             <Feedback {...this.state.feedback} />
        //         </div>
        //     );
        // }

        return (
            <div>
                {this.props.reportData.feedBackIds && this.props.reportData.feedBackIds.length > 0
                    ?
                    <div>
                        {/* <p className="smallText">
                            You have received feedback from multiple users. Select which to display
                        </p> */}
                         <select id="feedbackSelector" onChange={() => this.setActiveFeedback(document.getElementById("feedbackSelector").value)}>
                            <option value="0">Feedback from supervisor</option>
                            <option value="1">Feedback from reader #1</option>
                        </select>
                        {/* <button onClick={() => this.setActiveFeedback(0)}>1</button>
                        <button onClick={() => this.setActiveFeedback(1)}>2</button> */}
                    </div>
                    :
                    null
                }
                {this.state.activeFeedback
                    ?
                    <Feedback {...this.state.activeFeedback} />
                    :
                    null
                }
            </div>
        )
    }
}

class Feedback extends Component {

    constructor(props) {
        super(props);

        this.state = { feedbackUser: {} };
    }

    componentDidMount() {
    }

    render() {
        getUser(this.props.userId).then(response => {
            this.setState({ feedbackUser: response.entity })
        })

        return (
            <div>
                <h2>
                    Feedback from {capitalizeFirstLetter(this.props.role) + ": " + this.state.feedbackUser.name} 
                </h2>
                <table>
                    <tbody>
                        <tr>
                            <td>

                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="feedbackBox">
                    {this.props.text}
                </div>
            </div>
        )
    }
}

export default Submission