'use strict'

export class UsersMock {

    constructor() {
        this.entity = {
            _embedded: {
                users: [
                    {
                        id: 1,
                        name: "Lur, ruler of the planet Omicron Persei 8!",
                        emailAdress: "lur@omicronpersei8.com",
                        roles: [
                            "student",
                        ],
                    },
                    {
                        id: 10,
                        name: "Widow Pacman",
                        emailAdress: "pacmanwidow@wakawaka.com",
                    },
                    {
                        id: 11,
                        name: "Some Guy",
                        emailAdress: "someguy@google.com",
                    },
                    {
                        id: 12,
                        name: "I.C. Wiener",
                        emailAdress: "i.c.wiener@joke.com",
                    },
                    {
                        id: 13,
                        name: "Dr. Zoidberg",
                        emailAdress: "zoidipoo@woobwoob.com",
                    },
                ]
            }
        }
    }
}


export class StudentRequestsMock {
    constructor() {
        this.entity = {
            _embedded: {
                students: [
                    {
                        userId: 1,
                        supervisorId: 10,
                        supervisorAssigned: false,
                    },
                    {
                        userId: 12,
                        supervisorId: 10,
                        supervisorAssigned: false,
                    },
                    {
                        userId: 13,
                        supervisorId: 10,
                        supervisorAssigned: false,
                    },
                ]
            }
        }
    }
}


export class SupervisedStudentsMock {
    constructor() {
        this.entity = {
            _embedded: {
                students: [
                    {
                        id: 101,
                        userId: 11,
                        supervisorId: 10,
                        // supervisorAssigned: false,
                    },
                    {
                        id: 102,
                        userId: 13,
                        supervisorId: 10,
                        // supervisorAssigned: false,
                    },
                    {
                        id: 103,
                        userId: 12,
                        supervisorId: 10,
                        // supervisorAssigned: true,
                    }
                ]
            }
        }
    }
}

export class SubmissionsMock {

    constructor() {
        this.entity = {
            _embedded: {
                submissions: [
                    {
                        id: 20,
                        userId: 11,
                        submissionType: "PRJ_PLAN",
                        fileUrl: 'some_url',
                        submissionDate: "2019-04-30T14:53"
                    },
                    {
                        id: 21,
                        userId: 11,
                        submissionType: "INITIAL_REPORT",
                        fileUrl: 'some_url',
                        submissionDate: "2019-05-30T23:12"
                    },
                    {
                        id: 30,
                        userId: 13,
                        submissionType: "PRJ_PLAN",
                        fileUrl: '',
                        submissionDate: "2019-04-31T12:05"
                    },
                    {
                        id: 31,
                        userId: 13,
                        submissionType: "INITIAL_REPORT",
                        fileUrl: '',
                        submissionDate: "2019-05-22T16:35"
                    },
                    {
                        id: 40,
                        userId: 12,
                        submissionType: "PRJ_PLAN",
                        fileUrl: '',
                        submissionDate: "2019-05-22T16:35"
                    },
                ]
            }
        }
    }
}

export class ProjectPlanMock {
    constructor() {
        this.entity = {
            _embedded: {
                reports: [
                    {
                        id: 102,
                        submissionId: 20,
                        userId: 11,
                        grade: "pass",
                        deadline: "2019-05-20T23:55",
                        submissionDate: "2019-05-20T20:15",
                        approved: true,
                    },
                    {
                        id: 103,
                        submissionId: 30,
                        userId: 13,
                        grade: "pass",
                        deadline: "2019-05-20T23:55",
                        submissionDate: "2019-05-20T20:15",
                        approved: true,
                    },
                    {
                        id: 104,
                        submissionId: 40,
                        userId: 12,
                        grade: "pass",
                        deadline: "2019-05-20T23:55",
                        submissionDate: "2019-05-20T20:15",
                    },
                ]
            }
         }
    }
}

export class InitialReportMock {
    constructor() {
        this.entity = {
            _embedded: {
                reports: [
                    {
                        id: 103,
                        submissionId: 21,
                        userId: 11, 
                        // grade: "pass",
                        deadline: "2019-05-21T23:55",
                        submissionDate: "2019-05-29T20:15",
                        bids: [],
                        assignedReaders: [],
                        assignedOpponent: null,
                    },
                    {
                        id: 104,
                        submissionId: 31,
                        userId: 13,
                        // grade: "pass",
                        deadline: "2019-05-25T23:55",
                        submissionDate: "2019-05-29T20:15",
                        bids: [],
                        assignedReaders: [],
                        assignedOpponent: null,
                    },

                ]
            }
        }
    }
}