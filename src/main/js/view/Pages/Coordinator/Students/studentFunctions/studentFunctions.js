import client from "../../../../../client";
import React, { Component } from "react";

import * as generalFunctions from "../../../../functions";

/**
 * Fetches all students and all their submissions
 * creates a studentObject adapted for the studentsTable
 */
export async function getAllStudents() {
  const studentList = [];

  let response = await generalFunctions.getFromAPI(
    "/coordinator/getAllStudents"
  ); // GET all students
  const students = response.entity;
  for (const student of students) {
    let submissions = await getAllSubmissions(student.userId);

    let studentObject = {
      userId: student.userId,
      name: await getName(student.userId),
      supervisorId: student.assignedSupervisorId,
      supervisorAssigned: supervisorAssigned(student.assignedSupervisorId),
      projectDescriptionSubmitted: await checkIfSubmitted(
        submissions.projectDescriptions[0].submissionId
      ),
      projectPlanSubmitted: await checkIfSubmitted(
        submissions.projectPlans[0].submissionId
      ),
      initialReportSubmitted: await checkIfSubmitted(
        submissions.initialReports[0].submissionId
      ),
      finalReportSubmitted: await checkIfSubmitted(
        submissions.finalReports[0].submissionId
      )
    };
    studentList.push(studentObject);
  }
  return studentList;
}

/**
 * Checks if a submission is submitted
 * Helper to return bool for getAllStudent
 * @param {String} submissionId
 */
export async function checkIfSubmitted(submissionId) {
  try {
    const response = await generalFunctions.getFromAPI(
      `/submissions/${submissionId}`
    );
    return response.entity.submissionDate ? true : false;
  } catch (e) {
    console.log(e);
  }
}

/**
 * Gets all submission for specified user
 * @param {String} userId
 */
export async function getAllSubmissions(userId) {
  try {
    const response = await generalFunctions.getFromAPI(
      `/coordinator/getAllSubmissionsByUserID?userId=${userId}`
    );
    return response.entity;
  } catch (e) {
    console.log(e);
  }
}

export async function getSubmission(submissionId) {
  try {
    const response = await generalFunctions.getFromAPI(`/submissions/${submissionId}`);
    return response.entity
  } catch (e) {
    console.log(e);
  }
}

/* ----- Helpers ----- */

function supervisorAssigned(userId) {
  return userId !== "" ? true : false;
}

export function booleanSymbol(bool) {
  return !bool ? (
    <i className="fas fa-times" />
  ) : (
    <i className="fas fa-check" />
  );
}

export async function getName(userId) {
  try {
    const response = await generalFunctions.getFromAPI(`/users/${userId}`);
    return !response.entity.name ? (
      <span>'Student not found'</span>
    ) : (
      await generalFunctions.capitalizeFirstLetter(response.entity.name)
    );
  } catch (e) {
    console.log(e);
  }
}

export async function getSupervisorName(userId) {
  if (userId === "") {
    return "Not assigned";
  } else {
    const response = await generalFunctions.getFromAPI(`/users/${userId}`);
    return generalFunctions.capitalizeFirstLetter(response.entity.name);
  }
}
