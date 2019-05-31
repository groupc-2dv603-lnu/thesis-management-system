"use strict"

import { getFromAPI, putToAPI, postToAPI } from './../../functions';

export function capitalizeFirstLetter(string) {
    if(string == null)
        return "N/A";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}


export function requestSupervisor(supervisor) {
    return putToAPI("/student/requestSupervisor?supervisorUserId=" + supervisor.userId)
    // temp
    .then(() => {
        getUser(supervisor.userId).then(user => {
            console.log("Requested supervisor " + user.entity.name + " (" + supervisor.userId + ") successfully");
        });
    })
    .catch((error) => {
        console.log("error", error)
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
    return getFromAPI("/submissions/" + submissionId)
}

export function getFeedbackByDocId(documentId) {
    return getFromAPI("/student/feedback?documentId=" + documentId);
}

export function getFeedback(feedbackId) {
    return getFromAPI("/student/feedback/" + feedbackId);
}