import client from "../../../client";
import React, { Component } from "react";

export function getFromAPI(getPath) {
  return client({ method: "GET", path: getPath });
}

// Gets all students and creates objects suited for studentstable
export async function getAllStudents() {
  const studentList = [];

  let response = await getFromAPI("/coordinator/getAllStudents"); // GET all students
  const students = response.entity;
  for (const student of students) {
    // let submissions = await getAllSubmissions(student.userId)

    let studentObject = {
      userId: student.userId,
      name: await getName(student.userId),
      supervisorId: student.assignedSupervisorId,
      supervisorAssigned: supervisorAssigned(student.assignedSupervisorId)
    };
    //console.log('OBJECT', studentObject)
    studentList.push(studentObject);
  }
  return studentList;
}

/**
 * Gets all submission for specified user
 * @param {String} userId 
 */
export async function getAllSubmissions(userId) {
  try {
    const response = await getFromAPI(
      `/coordinator/getAllSubmissionsByUserID?userId=${userId}`
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

export function capitalizeFirstLetter(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export async function getName(userId) {
  try {
    const response = await getFromAPI(`/users/${userId}`);
    return !response.entity.name ? (
      <span>'Student not found'</span>
    ) : (
      await capitalizeFirstLetter(response.entity.name)
    );
  } catch (e) {
    return "User not found";
  }
}

export async function getSupervisorName(userId) {
  if (userId === "") {
    return "Not assigned";
  } else {
    const response = await getFromAPI(`/users/${userId}`);
    return capitalizeFirstLetter(response.entity.name);
  }
}
