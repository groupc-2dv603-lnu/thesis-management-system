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

export function acceptRequest(user) {
    console.log("accepting " + user.name + "'s request");
}

export function rejectRequest(user) {
    console.log("rejecting " + user.name + "'s request");
}