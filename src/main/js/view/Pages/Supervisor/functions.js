import * as Mock from './mocks';

export function getAppliedStudents() {
    let mock = new Mock.StudentRequestsMock();
    return new Promise(resolve => resolve(mock));
}

export function getSupervisedStudents() {
    let mock = new Mock.SupervisedStudentsMock();
    return new Promise(resolve => resolve(mock));
}

export function getUser(userId) {
    let mock = new Mock.UsersMock().entity._embedded.users.find(user => user.id == userId);
    return new Promise(resolve => resolve(mock));
}

// export function getUser(userId) {
//     return client({ method: 'GET', path: '/users/' + userId });
// }

export function acceptRequest(user) {
    console.log("accepting " + user.name + "'s request");
}

export function rejectRequest(user) {
    console.log("rejecting " + user.name + "'s request");
}

export function getSubmission(submissionId) {
    let mock = new Mock.SubmissionsMock().entity._embedded.submissions.find(submission => submission.id == submissionId);
    return new Promise(resolve => resolve(mock));
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

export function sendFeedback(text) {
    console.log("sending feedback", text)
}
