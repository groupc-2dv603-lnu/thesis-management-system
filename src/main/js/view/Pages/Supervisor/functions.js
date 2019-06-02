import * as Mock from './mocks';
import { getFromAPI, postToAPI, putToAPI } from './../../functions';

export function getAppliedStudents() {
    return getFromAPI("/supervisor/appliedStudents")
}

export function getAssignedStudents() {
    return getFromAPI("/supervisor/assignedStudents")
}

function modifyRequest(student, state) {
    putToAPI("/supervisor/assignStudent/" + student.userId + "?state=" + state);
}

export function acceptRequest(student) { 
    return modifyRequest(student, true);
}

export function rejectRequest(student) {
    return modifyRequest(student, false);
}

function modifyPlan(report, state) {
    putToAPI("/supervisor/approvePlan/" + report.id + "?state=" + state)
    //temp
    .then(() => console.log((state == true ? "approving" : "rejecting") + " project plan"))
    .catch((error) => console.log("error", error))
}

export function approvePlan(report) { 
    modifyPlan(report, true);
}

export function rejectPlan(report) {
    modifyPlan(report, false);

}

export function getMockSubmission(submissionId) {
    let mock = new Mock.SubmissionsMock().entity._embedded.submissions.find(submission => submission.id == submissionId);
    return new Promise(resolve => resolve(mock));
}

export function getSubmission(submissionId) {
    return getFromAPI("/submissions/" + submissionId);
}

// export function getSubmissionsByUser(userId) {
//     let mock = new Mock.SubmissionsMock().entity._embedded.submissions.filter(submission => submission.userId == userId && submission.type == ("project plan" || "initial report"));
//     return new Promise(resolve => resolve(mock));
// }

export function getUserProjectPlan(userId) {
    let mock = new Mock.ProjectPlanMock().entity._embedded.reports.find(report => report.userId == userId);
    return new Promise(resolve => resolve(mock));
    // return getFromAPI("/supervisor/projectPlan/" + userId);
}

export function getUserInitialReport(userId) {
    // let mock = new Mock.InitialReportMock().entity._embedded.reports.find(report => report.userId == userId);
    // return new Promise(resolve => resolve(mock));
    return getFromAPI("/supervisor/initialReport/" + userId);
}

export function sendFeedback(text, reportId) {
    const feedback = { documentId: reportId, text: text }; // userId: "something"

    postToAPI("/supervisor/feedback?id=" + reportId, feedback)
    //temp
    .then(() => console.log("sent feedback", text))
    .catch((error) => console.log("error", error))
}

