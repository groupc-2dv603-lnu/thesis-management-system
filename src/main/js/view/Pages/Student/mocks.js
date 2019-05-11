export default class StudentMocks {
    constructor() {
        
        this.currentSupervisor = {
            id: 1,
            name: "Diego Perez",
        };

        this.awaitingSupervisorResponse = true;
        
        this.projectDescription = {
        type: "project description", 
            // status: "finished", 
            grade: "pass",
            fileURL: "a_url", 
            deadline: "2019-05-14T23:55",
            submissionDate: "2019-05-03T23:55",
        };
        this.projectPlan = { 
            type: "project plan", 
            // status: "active", 
            grade: "Pass", 
            fileURL: "a_url", 
            deadline: "2019-05-09T23:55",
            submissionDate: null,
        };
        this.initialReport = { 
            type: "initial report", 
            // status: "disabled", 
            grade: null,
            fileURL: null,
            deadline: "2019-05-20T10:00",
            submissionDate: null,
        };
        this.finalReport = { 
            type: "final report", 
            // status: "disabled",
            grade: null, 
            fileURL: null, 
            deadline: null,
            submissionDate: null,
        };
        
        this.supervisors = [
            { id: "1", name: "Diego Perez" },
            { id: "2", name: "Mauro Caporuscio" },
            { id: "3", name: "Some Guy" },
        ];
    }
}