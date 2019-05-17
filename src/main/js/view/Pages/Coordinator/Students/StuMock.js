'use strict'

export class StuMock {

  constructor() {
    this.users = [
        {
            id: 1,
            name: "Lur, ruler of the planet Omicron Persei 8!",
            emailAdress: "lur@omicronpersei8.com",
            roles: [
                "student",
            ],
        }
      ]
    }
  }

  export class StudentMock {
    constructor() {
        this.id = 99;
        this.userId = 1;
        this.supervisorId = 10;
        this.supervisorAssigned = false;
    }
}