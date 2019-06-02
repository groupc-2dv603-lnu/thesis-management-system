
export const dbSubmissionTypeMap = new Map([ ["projectDescription", "PRJ_DESCRIPTION"], ["projectPlan", "PRJ_PLAN"], ["initialReport", "INITIAL_REPORT"], ["finalReport", "FINAL_REPORT"] ]);

export const dbSubmissionTypes = { projectDescription: "PRJ_DESCRIPTION", projectPlan: "PRJ_PLAN", initialReport: "INITIAL_REPORT", finalReport: "FINAL_REPORT" };

export const submissionTypes = [ "PRJ_DESCRIPTION", "PRJ_PLAN", "INITIAL_REPORT", "FINAL_REPORT" ];

export const grades = { NOGRADE: "NOGRADE", PASS: "PASS", FAIL: "FAIL" };

export const gradesAF = { A: "A", B: "B", C: "C", D: "D", E: "E", F: "F" };

export const roles = { ADMIN: "ADMIN", STUDENT: "STUDENT", COORDINATOR: "COORDINATOR", SUPERVISOR: "SUPERVISOR", READER: "READER", OPPONENT: "OPPONENT" }

export const projectPlanApprovedStatus = { pending: "PENDING", approved: "APPROVED", failed: "FAILED" };
