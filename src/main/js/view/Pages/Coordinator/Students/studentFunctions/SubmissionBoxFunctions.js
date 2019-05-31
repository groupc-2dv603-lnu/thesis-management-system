import React, { Component } from "react";
import moment from "moment";

export function statusOptions() {
  //Shall match enums for submissionStatus -> backend
  const status = ["DISABLED", "ACTIVE", "FINISHED"];
  let i = 0;
  return status.map(value => (
    <option value={value} key={i++}>
      {value}
    </option>
  ));
}

/**
 * 1 for Pass fail
 * 2 for a-f
 * @param {number} type
 */
export function getGrades(type) {
  let grades = [];
  let i = 0;
  if (type === 1) {
    grades = ["NOGRADE", "PASS", "FAIL" ];
  } else if (type === 2) {
    grades = ["A", "B", "C", "D", "E", "F"];
  }

  return grades.map(value => (
    <option value={value} key={i++}>
      {value}
    </option>
  ));
}

// Fix toLowerCase except first ?
export function getGrade(grade) {
  return grade === "NOGRADE" ? "Not graded" : grade;
}

export function getDeadline(date) {
  return date === null || date === ""
    ? "Not set"
    : moment(date).format("MMMM Do YYYY, hh:mm:ss a");
}

export const getDate = date => {
  return moment(date).format("MMMM Do YYYY, hh:mm:ss a");
};


/**
 * DUBLETT, finns i generalFunctions
 * @param {*} url 
 * @param {*} object 
 */
export const updateSubmission = async (url, object) => {
  console.log("url", url);
  console.log("object", object);

  const request = await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: object
  });
  return request;
};

/**
 * compares deadline to current time
 * returns open or closed
 */
export const getStatus = deadline => {
  if (deadline === "") {
    return "Closed";
  }
  const deadLine = moment(deadline);
  const now = moment();

  if (now > deadLine) {
    return "Closed";
  } else {
    return "Open";
  }
};

