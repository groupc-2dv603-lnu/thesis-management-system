"use strict"

import * as Mock from "./mocks";
import { getFromAPI, putToAPI, postToAPI } from './../../functions';

export function capitalizeFirstLetter(string) {
    if(string == null)
        return "N/A";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

//TODO unfinished/mocks

export function uploadFile(file) {
    console.log("uploading file", file);
    
    // getLoggedInUser().then(user => {
        // console.log(user.entity)
        const submission = { filePath: "c:\\" + file.name, submissionStatus: "ACTIVE", userId: "5cece73a6436231310ed8450", submissionType: "PRJ_DESCRIPTION" };
        console.log(submission)
        return postToAPI("/submissions", submission).then(() => console.log("file uploaded successfully"));
    // });
}

export function requestSupervisor(supervisor) {
    // if(getLoggedInUser().supervisorId) {
    //     alert("You cannot request a new supervisor while a previous request is unanswered");
    //     return;
    // }

    return putToAPI("/student/requestSupervisor?supervisorUserId=" + supervisor.userId)
    .then(() => {
        getUser(supervisor.userId).then(user => {
            console.log("Requested supervisor " + user.entity.name + " (" + supervisor.userId + ") successfully");
        });
    })
    .catch((error) => {
        console.log(error)
    });
}


function getLoggedInUser() {
    return getFromAPI("/loginUser");
}

export function getUser(userId) {
    return getFromAPI("/users/" + userId);
}

 export function getStudentData() {
    return getFromAPI("/student/studentInfo");
}

export function getAvailableSupervisors() {
    return getFromAPI("/student/getAvailableSupervisors");
}

export function getSubmissionData(submissionId) {
    // let mock = new Mock.SubmissionsMock().entity._embedded.submissions.find(obj => obj.id == submissionId);
    // return new Promise(resolve => resolve(mock));
    return getFromAPI("/submissions/" + submissionId)
}

export function getFeedback(documentId) {
    return getFromAPI("/student/feedback?documentId=" + documentId);
}