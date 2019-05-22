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

/* ---- Student popups ---- */
export function getProjectDescription(userId) { 
  const mock = new Mock.ProjectDescriptionMock()
  const description = mock.entity.find(description => 
    userId === description.userId
  )
  return description === undefined ? null : description

}

export function getFeedback(submissionId) {
  const mock = new Mock.FeedbackMock()

  return mock.entity._embedded.feedback.find(fb => 
    fb.submissionId === submissionId
  )
 
}