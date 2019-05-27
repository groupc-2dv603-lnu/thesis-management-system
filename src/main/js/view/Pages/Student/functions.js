"use strict"

import * as Mock from "./mocks";

const client = require("../../../client");

export function capitalizeFirstLetter(string) {
    if(string == null)
        return "N/A";
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export function getFromAPI(getPath) {
    return client({ method: "GET", path: getPath });
}

function putToAPI(putPath) {
    client({ method: "PUT", path: putPath });
}

//TODO unfinished/mocks

export function uploadFile(file) {
    console.log("uploading file", file);
}

export function requestSupervisor(supervisor) {
    if(getOwnUser().supervisorId) {
        alert("You cannot request a new supervisor while a previous request is unanswered");
        return;
    }
    // getUser(supervisor.userId).then((response) => {
    //     console.log("Requesting supervisor: ", response)
    // });

    putToAPI("/student/requestSupervisor?supervisorUserId=" + supervisor.userId);
    // .then(() => {
    //     console.log(getOwnUser().name + "requested supervisor " + supervisor.userId + " successfully");
    // })
    // .catch((error) => {
    //     console.log(error)
    // });
}


function getOwnUser() {
    return getFromAPI("/loginUser")
}

export function getMockUser(userId) {
    let mock = new Mock.UsersMock().entity._embedded.users.find(obj => obj.id == userId);
    return new Promise(resolve => resolve(mock));
}

export function getUser(userId) {
    return getFromAPI("/users/" + userId)
}

 export function getStudentData() {
    let mock = new Mock.StudentMock();
    return new Promise(resolve => resolve(mock));
}

export function getAvailableSupervisors() {
    return getFromAPI("/student/getAvailableSupervisors");
}

export function getSubmissionData(submissionId) {
    let mock = new Mock.SubmissionsMock().entity._embedded.submissions.find(obj => obj.id == submissionId);
    return new Promise(resolve => resolve(mock));
}

// export function getPDData() {
//     // let mock = new Mock.ProjectDescriptionMock();
//     // return new Promise(resolve => resolve(mock));
//     return getFromAPI("/projectDescription");
// }

// export function getPPData() {
//     // let mock = new Mock.ProjectPlanMock();
//     // return new Promise(resolve => resolve(mock));
//     return get("/projectPlan");
// }

// export function getIRData() {
//     // let mock = new Mock.InitialReportMock();
//     // return new Promise(resolve => resolve(mock));
//     return get("/intialReport");
// }

// export function getFRData() {
//     // let mock = new Mock.FinalReportMock();
//     // return new Promise(resolve => resolve(mock));
//     return get("/finalReport");
// }

export function getFeedback(documentId) {
    // let mock = new Mock.FeedbackMock().entity._embedded.feedback.filter(obj => obj.submissionId == submissionId);
    // return new Promise(resolve => resolve(mock));
    getFromAPI("/student/feedback?" + documentId);
}