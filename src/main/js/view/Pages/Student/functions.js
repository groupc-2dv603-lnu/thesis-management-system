'use strict'

import * as Mock from './mocks';

const client = require('../../../client');

export function capitalizeFirstLetter(string) {
    if(string == null)
        return "N/A";
    return string.charAt(0).toUpperCase() + string.slice(1);
}


//TODO unfinished/mocks

export function uploadFile(file) {
    console.log("uploading file", file);
}

export function requestSupervisor(supervisor) {
    getUser(supervisor.userId).then((response) => {
        console.log('Requesting supervisor: ', response)
    });

    // return client({ method: 'PUT', path: '/requestSupervisor' })
    // .catch((error) => {
    //     console.log(error)
    // });
}

export function getOwnUser(userId) {
    let mock = new Mock.UsersMock().entity._embedded.users.find(obj => obj.id == userId);
    return new Promise(resolve => resolve(mock));
}

export function getUser(userId) {
    return client({ method: 'GET', path: '/users/' + userId });
}

 export function getStudentData() {
    let mock = new Mock.StudentMock();
    return new Promise(resolve => resolve(mock));
}

export function getAvailableSupervisors() {
    return client({ method: 'GET', path: '/getAvailableSupervisors' });
}

export function getSubmissionData(submissionId) {
    let mock = new Mock.SubmissionsMock().entity._embedded.submissions.find(obj => obj.id == submissionId);
    return new Promise(resolve => resolve(mock));
}

export function getPDData() {
    let mock = new Mock.ProjectDescriptionMock();
    return new Promise(resolve => resolve(mock));
}

export function getPPData() {
    let mock = new Mock.ProjectPlanMock();
    return new Promise(resolve => resolve(mock));
}

export function getIRData() {
    let mock = new Mock.InitialReportMock();
    return new Promise(resolve => resolve(mock));
}

export function getFRData() {
    let mock = new Mock.FinalReportMock();
    return new Promise(resolve => resolve(mock));
}

export function getFeedback(submissionId) {
    let mock = new Mock.FeedbackMock().entity._embedded.feedback.filter(obj => obj.submissionId == submissionId);
    return new Promise(resolve => resolve(mock));
}