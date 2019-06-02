// ½ sidan renderas inte om efter supervisor request - fixat, men fullösning. passar referens till supervisorbox och kör en uppdateringsmetod på den
// ½ sidan uppdateras inte efter filuppladdning

'use strict';

import React, { Component } from 'react';
import SupervisorBox from './supervisor';
import Submission from './submission';
import * as common from './../../functions'
import './style.css';

class Student extends Component {
    constructor(props) {
        super(props);

        this.state = { submissions: [] };
    }

    componentDidMount() {
        this.updateAll();
    }

    updateAll() {
        const reportCalls = ["projectDescription", "projectPlan", "initialReport", "finalReport"];

            let reports = new Array(4);
            let count = 0;

            for (let i = 0; i < reportCalls.length; i++) {
                common.getFromAPI("/student/" + reportCalls[i]).then(report => {
                    reports[i] = <Submission reference={this} key={reportCalls[i]} reportData={report.entity} type={reportCalls[i]} />
                })
                    .then(() => {
                        count++;
                        if (count == 4) {
                            this.setState({ submissions: reports });
                        }
                    })
            };
    }

    render() {
        return (
            <div>
                <SupervisorBox />

                <h2>Thesis Submissions</h2>
                {this.state.submissions}
            </div>
        )
    }

}

export default Student