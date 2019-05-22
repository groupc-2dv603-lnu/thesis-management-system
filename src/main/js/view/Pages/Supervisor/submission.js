'use strict'

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as func from './functions';
import * as styles from './styles';

export class Submission extends Component {
    
    constructor(props) {
        super(props);

        this.state = { submission: {}, user: {} };
    }

    componentDidMount() {
        func.getSubmission(this.props.match.params.id).then(response => {
            this.setState({ submission: response });
            func.getUser(response.studentId).then(response2 => {
                this.setState({ user: response2 })
            })
        });
        
    }

    render() {
    
        return (
            <div>
                {/* TEMP */}
                <Link to="/supervisor">
                    <button>Back</button>
                </Link>
                <br/>
                <br/>

                {this.state.submission.type == "project plan" ?
                    <div>Give feedback on project plan</div>
                :
                    <div>
                        Assess report
                    </div>
                }
                made by { this.state.user.name }
                <br/>
                <br/>
                <a href={this.state.submission.fileURL} download>Download report</a>
                <br/>
                <br/>
                
                Write feedback
                <textarea style={styles.feedbackBox} id="feedbackBox"></textarea>
                <br/>
                <button type="submit" onClick={() => func.sendFeedback(document.getElementById("feedbackBox").value)}>Send</button>

            </div>
        )
    }
}