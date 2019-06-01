import React, { Component } from "react";
import { dbTypes } from '../../../../enums'
import * as generalFunctions from "../../../../functions";


export const getStudentTableData = async () =>  {
  const getAllStudents = await generalFunctions.getFromAPI(`/coordinator/getAllStudents`)
  const getAllSubmissions = await generalFunctions.getFromAPI(`/submissions`)
  const allStudents = getAllStudents.entity
  const allSubmissions = getAllSubmissions.entity._embedded.submissions

  const studentsList = []

  for(const student of allStudents) {
    const studentSubmissions = await allSubmissions.filter(submission => submission.userId === student.userId)
      let studentObject = {
        name: await getName(student.userId),
        assignedSupervisorId: student.assignedSupervisorId,
        projectDescription: await studentSubmissions.find(sub => sub.submissionType === dbTypes.projectDescription),
        projectPlan: await studentSubmissions.find(sub => sub.submissionType === dbTypes.projectPlan),
        initialReport: await studentSubmissions.find(sub => sub.submissionType === dbTypes.initialReport),
        finalReport: await studentSubmissions.find(sub => sub.submissionType === dbTypes.finalReport),
      }
    studentsList.push(studentObject)
  }
  return studentsList
}

export const isSubmitted = (submission, submissionType) => {
  return submission.submissionType === submissionType && submission.fileUrl !== "" ? true : false
}

/*
export async function getAllStudents() {
  const studentList = [];
  try {
    let response = await generalFunctions.getFromAPI(
      "/coordinator/getAllStudents"
    ); 
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
  } catch (e) {
    console.log('GET all students ERROR', e);
  }
}
*/

/**
 * Checks if a submission is submitted
 * Helper to return bool for getAllStudent
 * @param {String} submissionId
 */
export async function checkIfSubmitted(submissionId) {
  try {
    if (submissionId === "") return false;

    const response = await generalFunctions.getFromAPI(
      `/submissions/${submissionId}`
    );
    return response.entity.fileUrl !== "" ? true : false;
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
    const response = await generalFunctions.getFromAPI(
      `/submissions/${submissionId}`
    );
    return response.entity;
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
    return !response.entity.name
      ? "User not found"
      : await generalFunctions.capitalizeFirstLetter(response.entity.name);
  } catch (e) {
    console.log(e);
  }
}

export async function getSupervisorName(userId) {
  if (userId === "") {
    return "No supervisor assigned";
  } else {
    const response = await generalFunctions.getFromAPI(`/users/${userId}`);
    return (
      "Supervisor: " +
      generalFunctions.capitalizeFirstLetter(response.entity.name)
    );
  }
}

export async function getFeedbacks(feedbackIds) {
  let feedbacks = [];

  try {
    for (const feedbackId of feedbackIds) {
      let feedback = await getFeedback(feedbackId);
      feedbacks.push(feedback);
    }
    return feedbacks;
  } catch (e) {
    console.log(e);
  }
}

export async function getFeedback(feedbackId) {
  try {
    const response = await generalFunctions.getFromAPI(
      `/student/feedback/${feedbackId}`
    );
    console.log("FEEDBACK", response.entity);
    let feedback = {
      name: await getName(response.entity.userId),
      role: response.entity.role,
      text: response.entity.text
    };
    return feedback;
  } catch (e) {
    console.log(e);
  }
}
