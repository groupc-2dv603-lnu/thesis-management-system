import React, { Component } from "react";
import { dbSubmissionTypes } from "../../../../enums";
import * as generalFunctions from "../../../../functions";

export const getStudentTableData = async () => {
  try {
    const getAllStudents = await generalFunctions.getFromAPI(
      `/coordinator/getAllStudents`
    );
    
    const getAllSubmissions = await generalFunctions.getFromAPI(`/submissions`);
    const allStudents = getAllStudents.entity;
    const allSubmissions = getAllSubmissions.entity._embedded.submissions;

    const studentsList = [];

    for (const student of allStudents) {
      const studentSubmissions = await allSubmissions.filter(
        submission => submission.userId === student.userId
      );
      let studentObject = {
        userId: student.userId,
        name: await getName(student.userId),
        assignedSupervisorId: student.assignedSupervisorId,
        projectDescription: await studentSubmissions.find(
          sub => sub.submissionType === dbSubmissionTypes.projectDescription
        ),
        projectPlan: await studentSubmissions.find(
          sub => sub.submissionType === dbSubmissionTypes.projectPlan
        ),
        initialReport: await studentSubmissions.find(
          sub => sub.submissionType === dbSubmissionTypes.initialReport
        ),
        finalReport: await studentSubmissions.find(
          sub => sub.submissionType === dbSubmissionTypes.finalReport
        )
      };
      studentsList.push(studentObject);
    }
    studentsList.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)); 

    return studentsList;
  } catch (e) {
    console.log(e);
  }
};

export const isSubmitted = (submission, submissionType) => {
  return submission.submissionType === submissionType &&
    submission.fileUrl !== ""
    ? true
    : false;
};

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
    response.entity.name = await getName(response.entity.userId);
    return response.entity;
  } catch (e) {
    console.log(e);
  }
}

/* ----- Helpers ----- */

export function booleanSymbol(bool) {
  return !bool ? (
    <i className="fas fa-times" />
  ) : (
    <i className="fas fa-check" />
  );
}

export async function getName(userId) {
  if (userId === undefined) {
    return;
  } else {
    try {
      const response = await generalFunctions.getFromAPI(`/users/${userId}`);
      return !response.entity.name
        ? "User not found"
        : await generalFunctions.capitalizeFirstLetter(response.entity.name);
    } catch (e) {
      console.log(e);
    }
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
