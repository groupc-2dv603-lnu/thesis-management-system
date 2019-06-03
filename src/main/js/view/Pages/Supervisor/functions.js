import { getFromAPI, postToAPI, putToAPI } from './../../functions';

export function getAppliedStudents() {
    return getFromAPI("/supervisor/appliedStudents");
}

export function getAssignedStudents() {
    return getFromAPI("/supervisor/assignedStudents");
}

function modifyRequest(student, state) {
    return putToAPI("/supervisor/assignStudent/" + student.userId + "?state=" + state);
}

export function acceptRequest(student) { 
    return modifyRequest(student, true);
}

export function rejectRequest(student) {
    return modifyRequest(student, false);
}

export function modifyPlan(userId, state) {
    return putToAPI("/supervisor/approvePlan/" + userId + "?state=" + state);
}

export function getSubmission(submissionId) {
    return getFromAPI("/submissions/" + submissionId);
}

export function getUserProjectPlan(userId) {
    return getFromAPI("/supervisor/projectPlan/" + userId);
}

export function getUserInitialReport(userId) {
    return getFromAPI("/supervisor/initialReport/" + userId);
}

export function sendFeedback(text, report) {
    return postToAPI("/supervisor/feedback/" + report.submissionId + "?text=" + text);
}

export function getFeedback(reportId) {
    return getFromAPI("/supervisor/feedback?documentId=" + reportId);
}

export function getCurrentAvailability() {
    return getFromAPI("/supervisor/isAvailable");
}

export function setAvailability(state) {
    return putToAPI("/supervisor/setAvailability?state=" + state);
}
