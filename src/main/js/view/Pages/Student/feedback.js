'use strict'

import React, { Component } from 'react';
import { formatDate } from './../../functions';
import * as func from './functions';
import { capitalizeFirstLetter, formatCamelCaseToText, getUser } from './../../functions';
import './style.css';

export default class FeedbackList extends Component {

    constructor(props) {
        super(props);
        this.state = { activeFeedback: null, options: [] };

        this.feedbackIds = [];
    }

    componentDidMount() {
        if (this.props.reportData.feedBackId) {
            this.setActiveFeedback(this.props.reportData.feedBackId);
        }
        else if (this.props.reportData.feedBackIds) {
            this.feedbackIds = this.props.reportData.feedBackIds;

            this.setActiveFeedback(this.props.reportData.feedBackIds[0]);
                   
            // set select options if there is more than one feedback
            /*
            let temp = [this.props.reportData.feedBackIds.length];
            
            for (let i = 0; i <= temp.length; i++) {
                func.getFeedback(this.props.reportData.feedBackIds[i])
                    .then(feedback => {
                        getUser(feedback.entity.userId).then(user => {
                            temp[i] = (
                                <option key={i} value={this.props.reportData.feedBackIds[i]}>Feedback from {feedback.entity.role.toLowerCase() + ": " + user.entity.name}</option>
                            )
                            this.setState({ options: temp }) // TODO not optimal to set state every time
                        })
                    })
            }
            */

            // alternatte set select options
            let temp = [];
            for(let i = 0; i < this.props.reportData.feedBackIds.length; i ++) {
                temp.push(
                    <option key={i} value={this.feedbackIds[i]}>Feedback #{i + 1}</option>
                );
            }
            this.setState({ options: temp });

        }


    }

    setActiveFeedback(feedbackId) {
        func.getFeedback(feedbackId).then(response => {
            this.setState({ activeFeedback: response.entity });
        });
    }

    render() {
        return (
            <div>
                {this.props.reportData.feedBackIds && this.props.reportData.feedBackIds.length > 1
                    ?
                    <div>
                        <p className="smallText">
                            You have received feedback from multiple users. Select which to display
                        </p>
                        <select id="feedbackSelector" defaultValue={this.props.reportData.feedBackIds[0]} onChange={() => this.setActiveFeedback(document.getElementById("feedbackSelector").value)}>
                            {this.state.options}
                        </select>
                    </div>
                    :
                    <p /> 
                }
                {this.state.activeFeedback
                    ?
                    <Feedback {...this.state.activeFeedback} type={this.props.type}/>
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
                    Feedback for {formatCamelCaseToText(this.props.type)}
                </h2>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                Feedback from
                            </td>
                            <td>
                                {capitalizeFirstLetter(this.state.feedbackUser.name)}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Role
                            </td>
                            <td>
                                {capitalizeFirstLetter(this.props.role)}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Date
                            </td>
                            <td>
                                {formatDate(this.props.submittedDate)}
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* <div className="feedbackBox"> */}
                    {this.props.text}
                {/* </div> */}
            </div>
        )
    }
}