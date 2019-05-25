import client from "../../../client";
import * as Mock from './functions'
import React, { Component } from 'react';

export function getFromAPI(getPath) {
  return client({ method: "GET", path: getPath });
}

export async function getStudentsForTable() {
  const studentList = []

  let response = await Mock.getStudents() // GET all students

  const students = await response.entity._embedded.students

  for (const student of students) {
    console.log('student', student)
    let studentObject = {
      userId: student.userId,
      name: await capitalizeFirstLetter(await getName(student.userId)),
      supervisorAssigned: student.supervisorAssigned,
      // supervisorName: await getName(student.supervisorId)
    }
    studentList.push(studentObject)
  }
  return studentList
}

export function booleanSymbol(bool) {
  return !bool ? <i className="fas fa-times" /> : <i className="fas fa-check" />;
}

export function capitalizeFirstLetter(name){
  if (!name) return "N/A";
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export async function getName(userId) {
  const response = await getFromAPI(`/users/${userId}`)
  return response.status.code !== 200 ? 'No name' : response.entity.name
}