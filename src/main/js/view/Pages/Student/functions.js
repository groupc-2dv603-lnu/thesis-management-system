'use strict'

import * as Mock from './mocks';

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
    let user = getUser(supervisor.userId);
    console.log("Requesting " + user.name + "(" + supervisor.id + ") as supervisor");
}

export function getUser(userId) {
    return new Mock.UsersMock().users.find(obj => obj.id == userId);
}

 export function getStudentData() {
    return new Mock.StudentMock();
}

export function getAvailableSupervisors() {
    return new Mock.AvailableSupervisorsMock().supervisors;
}

export function getSubmission(submissionId) {
    return new Mock.SubmissionsMock().submissions.find(obj => obj.id == submissionId);
}

export function getPDData() {
    return new Mock.ProjectDescriptionMock();   
}

export function getPPData() {
    return new Mock.ProjectPlanMock();
}

export function getIRData() {
    return new Mock.InitialReportMock();
}

export function getFRData() {
    return new Mock.FinalReportMock();
}

export function getFeedback(submissionId) {
    return new Mock.FeedbackMock().feedback.filter(obj => obj.submissionId == submissionId);
}