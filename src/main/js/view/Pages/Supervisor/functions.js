import * as Mock from './mocks';
import { getFromAPI, postToAPI, putToAPI } from './../../functions';

export function getAppliedStudents() {
    let mock = new Mock.StudentRequestsMock();
    return new Promise(resolve => resolve(mock));
}

export function getSupervisedStudents() {
    let mock = new Mock.SupervisedStudentsMock();
    return new Promise(resolve => resolve(mock));
}

export function getMockUser(userId) {
    let mock = new Mock.UsersMock().entity._embedded.users.find(user => user.id == userId);
    return new Promise(resolve => resolve(mock));
}

function modifyRequest(student, state) { //supervisor,
    // putToAPI("/supervisor/assignStudent/" + supervisor.userId + "/" + student.userId + "?state=" + state)
    putToAPI("/supervisor/assignStudent/5ced49d61c9d44000010fbf3/5cece73a6436231310ed8450?state=" + state)
    // putToAPI("/supervisor/assignStudent/" + student.userId + "?state=" + state)
    // temp
    .then(() => console.log((state == true ? "accepted" : "rejected") + " student ")) //+ student.userId + " "))
    .catch((error) => console.log("error", error));
}

export function acceptRequest(student) { //supervisor, 
    return modifyRequest(student, true); //supervisor, 
}

export function rejectRequest(student) { //supervisor, 
    return modifyRequest(student, false); //supervisor, 
}

function modifyPlan(report, state) { //supervisor, 
    // putToAPI("/supervisor/approvePlan/" + supervisor.userId + "/" + report.id + "?state=" + state)
    putToAPI("/supervisor/approvePlan/5ced49d61c9d44000010fbf3/" + report.id + "?state=" + state)
    // putToAPI("/supervisor/approvePlan/" + report.id + "?state=" + state)
    //temp
    .then(() => console.log((state == true ? "approving" : "rejecting") + " project plan"))
    .catch((error) => console.log("error", error))
}

export function approvePlan(report) { //supervisor, 
    modifyPlan(report, true); //supervisor, 
}

export function rejectPlan(report) { //supervisor, 
    modifyPlan(report, false); //supervisor, 

}

export function getSubmission(submissionId) {
    let mock = new Mock.SubmissionsMock().entity._embedded.submissions.find(submission => submission.id == submissionId);
    return new Promise(resolve => resolve(mock));
    // return getFromAPI("/submissions/" + submissionId);
}

// export function getSubmissionsByUser(userId) {
//     let mock = new Mock.SubmissionsMock().entity._embedded.submissions.filter(submission => submission.userId == userId && submission.type == ("project plan" || "initial report"));
//     return new Promise(resolve => resolve(mock));
// }

export function getUserProjectPlan(userId) {
    let mock = new Mock.ProjectPlanMock().entity._embedded.reports.find(report => report.userId == userId);
    return new Promise(resolve => resolve(mock));
}

export function getUserInitialReport(userId) {
    let mock = new Mock.InitialReportMock().entity._embedded.reports.find(report => report.userId == userId);
    return new Promise(resolve => resolve(mock));
}

export function sendFeedback(text, reportId) {
    const feedback = { documentId: reportId, text: text }; // userId: "something"

    postToAPI("/supervisor/feedback?id=" + reportId, feedback)
    //temp
    .then(() => console.log("sent feedback", text))
    .catch((error) => console.log("error", error))
}

