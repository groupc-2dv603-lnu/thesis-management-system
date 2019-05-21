"use strict";

export class UsersMock {
  constructor() {
    this.entity = {
      _embedded: {
        users: [
          {
            id: 1,
            name: "Lur, ruler of the planet Omicron Persei 8!",
            emailAdress: "lur@omicronpersei8.com",
            roles: ["student"]
          },
          {
            id: 10,
            name: "Widow Pacman",
            emailAdress: "pacmanwidow@wakawaka.com"
          },
          {
            id: 11,
            name: "Some Guy",
            emailAdress: "someguy@google.com"
          },
          {
            id: 12,
            name: "I.C. Wiener",
            emailAdress: "i.c.wiener@joke.com"
          },
          {
            id: 99,
            name: "Dr. Zoidberg",
            emailAdress: "zoidipoo@woobwoob.com"
          }
        ]
      }
    };
  }
}

export class StudentMock {
  constructor() {
    this.entity = [
      {
        id: 50,
        userId: 99,
        supervisorId: 10,
        supervisorAssigned: true
      },
      {
        id: 54,
        userId: 11,
        supervisorId: null,
        supervisorAssigned: false
      }
    ];
  }
}

export class AvailableSupervisorsMock {
  constructor() {
    this.entity = {
      _embedded: {
        supervisors: [
          { id: 1, userId: 10 },
          { id: 2, userId: 11 },
          { id: 3, userId: 12 }
        ]
      }
    };
  }
}
export class SubmissionsMock {
  constructor() {
    this.entity = {
      _embedded: {
        submissions: [
          {
            id: 1,
            studentId: 99,
            type: "project description",
            status: "active",
            fileURL: "some_url"
          },
          {
            id: 2,
            studentId: 99,
            type: "project plan",
            status: "submitted",
            fileURL: "some_url"
          },
          {
            id: 3,
            studentId: 99,
            type: "initial report",
            status: "submitted",
            fileURL: ""
          },
          {
            id: 4,
            studentId: 99,
            type: "final report",
            status: "active",
            fileURL: ""
          },
          {
            id: 1,
            studentId: 11,
            type: "project description",
            status: "submitted",
            fileURL: "some_url"
          },
          {
            id: 2,
            studentId: 11,
            type: "project plan",
            status: "finished",
            fileURL: "some_url"
          },
          {
            id: 3,
            studentId: 11,
            type: "initial report",
            status: "active",
            fileURL: ""
          },
          {
            id: 4,
            studentId: 11,
            type: "final report",
            status: "finished",
            fileURL: ""
          }
        ]
      }
    };
  }
}

export class ProjectDescriptionMock {
  constructor() {
    this.entity = [
      {
        id: 101,
        submissionId: 11,
        userId: 11,
        grade: "pass",
        deadline: "2019-05-12T23:55",
        submissionDate: "2019-05-10T20:15"
      },
      {
        id: 101,
        submissionId: 11,
        userId: 99,
        grade: "fail",
        deadline: "2019-05-12T23:55",
        submissionDate: "2019-05-10T20:15"
      }
    ];
  }
}

export class ProjectPlanMock {
  constructor() {
    this.entity = {
      id: 102,
      submissionId: 2,
      grade: "pass",
      deadline: "2019-05-24T23:55",
      submissionDate: "2019-05-20T20:15"
    };
  }
}

export class InitialReportMock {
  constructor() {
    this.entity = [
      {
        id: 103,
        studentId: 99,
        submissionId: 3,
        // grade: "pass",
        deadline: "2019-05-30T23:55",
        submissionDate: "2019-05-29T20:15",
        bids: [],
        assignedReaders: [11, 12],
        assignedOpponent: null
      },
      (this.entity = {
        id: 103,
        studentId: 11,
        submissionId: 3,
        // grade: "pass",
        deadline: "2019-05-30T23:55",
        submissionDate: "2019-05-29T20:15",
        bids: [11, 12, 99],
        assignedReaders: [],
        assignedOpponent: [11]
      })
    ];
  }
}

export class FinalReportMock {
  constructor() {}
}

export class FeedbackMock {
  constructor() {
    this.entity = {
      _embedded: {
        feedback: [
          {
            id: 22,
            submissionId: 1,
            userId: 11,
            role: "coordinator",
            text:
              "This is feedback from a mock object. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum vestibulum bibendum. Proin tempus sapien et consequat sollicitudin. Sed ut diam id magna auctor ultricies. Donec ac aliquam libero. Mauris eu elementum odio, sit amet faucibus sapien. Suspendisse lectus urna, sollicitudin in dignissim sit amet, pretium in enim. Nullam sodales metus diam, in iaculis augue bibendum nec. Cras bibendum vitae sem vitae fringilla. Vivamus pellentesque felis et vulputate pharetra. Integer est urna, lacinia eget eros quis, viverra sodales ipsum." +
              "Morbi dictum orci nec risus tristique facilisis. Ut bibendum hendrerit diam, sit amet luctus ante auctor eu. Nam fringilla arcu at vulputate volutpat. Aenean molestie convallis leo, ac sodales massa aliquam id. Quisque vestibulum ipsum auctor eros posuere, vel faucibus mauris pellentesque. Cras luctus lacinia lectus sed eleifend. Phasellus sollicitudin sem eu lorem vehicula, eget vehicula odio vulputate. Duis lobortis placerat lorem nec vehicula. Quisque semper semper lorem non finibus. Cras congue nisi sit amet odio viverra faucibus. Duis commodo, arcu eu molestie feugiat, nunc nibh consectetur tortor, eget pharetra odio dolor id dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut facilisis massa ac egestas rutrum. Sed vitae semper felis. Proin nec imperdiet enim, non iaculis arcu." +
              "Proin tincidunt sit amet neque eget blandit. Cras ultricies lobortis tellus, sed euismod dolor dictum ut. Quisque sed enim lobortis, elementum tellus at, placerat nibh. Vestibulum nec semper libero. Proin ac ornare magna. Fusce scelerisque dui at felis rutrum, non auctor libero viverra. In pellentesque, nisi et tempor porta, lorem ipsum fringilla tortor, sit amet rutrum eros felis sed ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut pretium, ipsum a gravida bibendum, ligula sem rhoncus felis, id cursus quam metus eu enim."
          },
          {
            id: 33,
            submissionId: 2,
            userId: 11,
            role: "coordinator",
            text: "Some feedback from the coordinator"
          },
          {
            id: 44,
            submissionId: 3,
            userId: 12,
            role: "reader",
            text: "Some reader feedback"
          },
          {
            id: 55,
            submissionId: 3,
            userId: 13,
            role: "reader",
            text: "Some other reader feedback"
          }
        ]
      }
    };
  }
}
