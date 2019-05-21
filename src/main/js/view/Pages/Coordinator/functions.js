import * as Mock from "./Mocks";
import React, { Component } from "react";
export function capitalizeFirstLetter(string) {
  if (string == null) return "N/A";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//TODO unfinished/mocks

/* --- "global" ---- */

export function getName(userId) {
  const users = new Mock.UsersMock();
  const user = users.entity._embedded.users.find(u => u.id === userId);
  return user.name;
}

/* --- submission page ---- */

export function checkDeadline(date) {
  return date === null ? "Not set" : date;
}

/* --- reports page ---- */
export function getbidderNames(bidders) {
  const bidderNames = [];
  bidders.forEach(bidder => {
    bidderNames.push(getName(bidder));
  });
  return bidderNames;
}

export function getIRData() {
  return new Mock.InitialReportMock();
}

/* --- students page ---- */
export function submissionSubmitted(userId, type) {
  const submissions = new Mock.SubmissionsMock();
  let sub = null;
  submissions.entity._embedded.submissions.forEach(submission => {
    if (submission.studentId === userId && submission.type === type) {
      if (
        submission.status === "finished" ||
        submission.status === "submitted"
      ) {
        sub = submission;
      }
    }
  });
  return sub === null ? (
    <i className="fas fa-check" />
  ) : (
    <i className="fas fa-times" />
  );
}

export function getStudents() {
  return new Mock.StudentMock();
}

export function tooltip(string) {
  return <span style={Style.tooltip}>{string}</span>
}