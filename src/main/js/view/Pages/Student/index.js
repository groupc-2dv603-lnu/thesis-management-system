// TODO
// separera css-fil - eller ha alla styles som konstanter i js-filerna
// implementera db-hämtning
// ½ sidan renderas inte om efter supervisor request - fixat, men fullösning. passar referens till supervisorbox och kör en uppdateringsmetod på den
// hur få hela addressen till filen vid uppladdning? - eventuellt löser backend det på ett annat sätt
// ½ sidan uppdateras inte efter filuppladdning
// datumformat +2h , icke lokalt

'use strict';

import React, { Component } from 'react';
import SupervisorBox from './supervisor';
import Submission from './submission';
import * as common from './../../functions'
import TemporaryFileUpload from "./TemporaryFileUpload";

class Student extends Component {
    constructor(props) {
        super(props);

        this.state = { submissions: [] };
    }

    componentDidMount() {

        const reportCalls = ["projectDescription", "projectPlan", "initialReport", "finalReport"];

        let reports = new Array(4);
        let count = 0;

        for(let i = 0; i < reportCalls.length; i ++) {
            common.getFromAPI("/student/" + reportCalls[i]).then(report => {
                reports[i] = <Submission key={reportCalls[i]} reportData={report.entity} type={reportCalls[i]} />
            })
            .then(() => {
                count ++;
                if(count == 4) {
                    this.setState({ submissions: reports });
                }
            })
        };
    }

    render() {        
        return (
            <div>
                <TemporaryFileUpload/>
                <SupervisorBox />

                <h2>Thesis Submissions</h2>
                {this.state.submissions}
            </div>
        )
    }

}

export default Student