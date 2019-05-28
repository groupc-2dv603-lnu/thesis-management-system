/**
 * this is for dev only
 * func.js will be used in prod.
 */

import * as Mock from "./Mocks";
import React, { Component } from "react";
import client from '../../../client'

export function getFromAPI(getPath) {
  return client({ method: 'GET', path: getPath });
}


/* --- "global" ---- */

// remove and user from the general functions
export function capitalizeFirstLetter(string) {
  if (string == null) return "N/A";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getStudents() {
  return new Mock.StudentsMock()
}

export function getName(userId) {
  const users = new Mock.UsersMock();
  const user = users.entity._embedded.users.find(u => u.id === userId);
  return user.name;
}

/* --- submission page ---- */
export function checkDeadline(date) {
  return date === null ? "Not set" : date;
}

export function getSubmissions() {
  return new Mock.SubMock().submissions;
}

/* --- reports page ---- */
export function getbidderNames(bidders) {
  const bidderNames = [];
  bidders.forEach(bidder => {
    bidderNames.push(getName(bidder));
  });
  return bidderNames;
}

export function getInitialReports() {
  let initialReport =  new Mock.InitialReportMock()
  console.log('initialReport',initialReport)
  return initialReport;
}

export function getOpponents() {
  const mock = new Mock.UsersMock();

  let opponent = [];
  mock.entity._embedded.users.forEach(user => {
    if ("roles" in user) {
      user.roles.forEach(role => {
        if (role === "opponent") {
          opponent.push(user.id);
        }
      });
    }
  });
  return opponent;
}


export function supervisorAssigned() {
  const mock = new Mock.StudentMock();
  return mock.entity.supervisorAssigned;
}

export function submissionSubmitted(userId, type) {
  const mock = new Mock.SubmissionsMock();
  let submission = mock.entity._embedded.submissions.find(
    sub => userId === sub.studentId && sub.type === type
  );

  if (submission !== undefined) {
    return submission.status === "finished" ? true : false;
  }
  return false;
}



/* ---- Getters ---- */
export function getSubmission(userId, type) {
  const mock = new Mock.SubmissionsMock();
  let submission = mock.entity._embedded.submissions.find(
    sub => userId === sub.studentId && sub.type === type
  );
  return submission !== undefined ? submission : null;
}

export function getInitialReport() {
  return new Mock.InitialReportMock().entity;
}

export function getThesis(submissionId, thesisPart) {
  if (thesisPart === "project description") {
    return new Mock.ProjectDescriptionMock().entity;
  } else if (thesisPart === "project plan") {
    return new Mock.ProjectPlanMock().entity;
  } else if (thesisPart === "initial report") {
    return new Mock.InitialReportMock().entity;
  } else if (thesisPart === "final report") {
    return new Mock.FinalReportMock().entity;
  } else {
    return null;
  }
}

export function getFeedback(submissionId) {
  const mock = new Mock.FeedbackMock();

  const feedback = mock.entity._embedded.feedback.find(
    fb => fb.submissionId === submissionId
  );
  return feedback === undefined ? null : feedback;
}

