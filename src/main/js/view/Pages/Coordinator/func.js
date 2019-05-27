import client from "../../../client";
import * as Mock from './functions'
import React, { Component } from 'react';

export function getFromAPI(getPath) {
  return client({ method: "GET", path: getPath });
}

// Gets all students and creates objects suited for studentstable
export async function getAllStudents() {
  const studentList = []

  let response = await getFromAPI('/coordinator/getAllStudents') // GET all students
  const students = response.entity
  console.log(students)
  for (const student of students) {
    let studentObject = {
      userId: student.userId,
      name: await getName(student.userId),
      supervisorId: student.assignedSupervisorId,
      supervisorAssigned: supervisorAssigned(student.assignedSupervisorId),
    }
    console.log('Object', studentObject)
    studentList.push(studentObject)
  }
  return studentList
}

function supervisorAssigned(userId) {
  return userId !== "" ? true : false
}

export function booleanSymbol(bool) {
  return !bool ? <i className="fas fa-times" /> : <i className="fas fa-check" />;
}

export function capitalizeFirstLetter(name){
  if (!name) return "User not found";
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export async function getName(userId) {
  try {
  const response = await getFromAPI(`/users/${userId}`)
  return !response.entity.name ? 'Student not found' : capitalizeFirstLetter(response.entity.name)
  } catch(e) {
    // console.log('getNameError', e)
    return 'User not found'
  }
}

export async function getAllSubmissionsByUserId(userId) {
  console.log(userId)
  try {
  const response = await getFromAPI(`/coordinator/getAllSubmissionsByUserID/${userId}`)
  console.log('responsSubmissions', response)
  } catch (e) {
    console.log('catch Submissions', e)
  }
}