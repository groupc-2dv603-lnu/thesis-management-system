// TODO
// design för icke tillgänglig data
// separera css-fil

'use strict';

import React, { Component } from 'react';
import SupervisorBox from './supervisor';
import Submission from './submission';

import { getStudentData, getPDData, getPPData, getIRData, getFRData } from './functions';

class Student extends Component {
    constructor(props) {
        super(props);

        this.studentData = getStudentData();
        this.PDData = getPDData();
        this.PPData = getPPData();
        this.IRData = getIRData();
        this.FRData = getFRData();
    }
  
    render() {
        return (
            <div>
                <SupervisorBox />

                <h2>Thesis Submissions</h2>
                <Submission {...this.PDData} type="Project Description"/>
                <Submission {...this.PPData} type="Project Plan"/>
                <Submission {...this.IRData} type="Initial Report"/>
                <Submission {...this.FRData} type="Final Report"/>
            </div>
        )
    }

}

export default Student