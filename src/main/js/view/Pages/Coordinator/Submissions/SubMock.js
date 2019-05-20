'use strict'

export class SubMock {

    constructor() {
      this.submissions = [
        {
          id: 1,
          type: 'project description',
          status: 'finished',
          deadline: '2019-05-18',
        },
        {
          id: 2,
          type: 'project plan',
          status: 'active',
          deadline: '2019-05-30'
        },
        {
          id: 3,
          type: 'initial report',
          status: 'disabled',
          deadline: null
        },
        {
          id: 4,
          type: 'final report',
          status: 'disabled',
          deadline: null
        }
      ]
    }
}

export function getSubmissions() {
  return new SubMock().submissions
}
