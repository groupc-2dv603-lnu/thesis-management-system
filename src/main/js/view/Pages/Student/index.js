// TODO
// design för icke tillgänglig data
// separera css-fil - eller ha alla styles som konstanter i js-filerna
// implementera db-hämtning

'use strict';

import React, { Component } from 'react';
import SupervisorBox from './supervisor';
import Submission from './submission';

import { getPDData, getPPData, getIRData, getFRData } from './functions';

class Student extends Component {
    constructor(props) {
        super(props);

        this.state = { PDData: {}, PPData: {}, IRData: {}, FRData: {} };
        
        // this.PPData = getPPData();
        // this.IRData = getIRData();
        // this.FRData = getFRData();
    }

    componentDidMount() {
        // getPDData().then(response => {
        //     this.setState({ PDData: response.entity })
        // })
        // getPPData().then(response => this.setState({ PPData: response.entity }));
        // getIRData().then(response => this.setState({ IRData: response.entity }));
        // getFRData().then(response => this.setState({ FRData: response.entity }));
    }

  
    render() {
        // const reports = {
        //     PDData: "PDData",
        //     PPData: "PPData",
        //     IRData: "IRData",
        //     FRData: "FRData",
        // }

        return (
            <div>
                <SupervisorBox />

                <h2>Thesis Submissions</h2>
                <Submission report={this.PDData} type="Project Description"/>
                <Submission report={this.PPData} type="Project Plan"/>
                <Submission report={this.IRData} type="Initial Report"/>
                <Submission report={this.FRData} type="Final Report"/>
            </div>
        )
    }

}

export default Student