import React, { Component } from "react";
import moment from "moment";

export function statusOptions() {
  const status = ["Disabled", "Active", "Finished"];
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
    grades = ["PASS", "FAIL", "NOGRADE"];
  } else if (type === 2) {
    grades = ["A", "B", "C", "D", "E", "F"];
  }

  return grades.map(value => (
    <option value={value} key={i++}>
      {value}
    </option>
  ));
}

export function downloadSubmission(fileUrl) {
  console.log("Download submission needs GET submission");
}

export function getDeadline(date) {
  return date === null || date === ""
    ? "Not set"
    : moment(date).format("MMMM Do YYYY, hh:mm:ss a");
}
