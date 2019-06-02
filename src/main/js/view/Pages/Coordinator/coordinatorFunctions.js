import moment from "moment";
import { dbSubmissionTypes } from '../../enums'
import * as generalFunctions from '../../functions'

export const validDeadline = deadline => {
  if (deadline === "T:00") {
    return false;
  }
  if (deadline.length !== 19) {
    return false;
  }
  const deadLine = moment(deadline);
  const now = moment();

  if (now > deadLine) {
    return false;
  } else {
    return true;
  }
};

/**
 * @param {String} dbSubmissionTypes - Enum 
 * @param {Object} object - object to update, will be JSON stringified
 */
export const updateSubmission = async (dbType, object) => {
  const submissionObject = await JSON.stringify(object);

  let url = "";
  if (dbType === dbSubmissionTypes.projectDescription) {
    url = "http://localhost:8080/coordinator/updateProjectDescription";
  } else if (dbType === dbSubmissionTypes.projectPlan) {
    url = "http://localhost:8080/coordinator/updateProjectPlan";
  } else if (dbType === dbSubmissionTypes.initialReport) {
    url = "http://localhost:8080/coordinator/updateInitialReport";
  } else if (dbType === dbSubmissionTypes.finalReport) {
    url = "http://localhost:8080/coordinator/updateFinalReport";
  }

  const request = await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: submissionObject
  });
  return request;
};

export const postCoordinatorFeedback = async (text, reportId) => {
  const request = await fetch(`http://localhost:8080/coordinator/feedback?text=${text}&FinalReportId=${reportId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
  });
  
  return request;

} 

export async function getName(userId) {
  if(userId === null) {
    return 
  }
  try {
    const response = await generalFunctions.getFromAPI(`/users/${userId}`);
    return !response.entity.name
      ? "User not found"
      : await generalFunctions.capitalizeFirstLetter(response.entity.name);
  } catch (e) {
    console.log(e);
  }
}

export const setDeadlineForAll = async (docType, deadline) =>  {
  const response = await generalFunctions.getFromAPI('/coordinator/getAllStudents')
  const allStudents = response.entity

  
  const documentsToChange = []
  for(const student of allStudents) {
    const studentDocs = await generalFunctions.getFromAPI(`/coordinator/getAllSubmissionsByUserID?userId=${student.userId}`)
    if (docType === dbSubmissionTypes.projectDescription) {
      documentsToChange.push(studentDocs.entity.projectDescriptions[0])
    } else if (docType === dbSubmissionTypes.projectPlan) {
      documentsToChange.push(studentDocs.entity.projectPlans[0])
    } else if (docType === dbSubmissionTypes.initialReport) {
      documentsToChange.push(studentDocs.entity.initialReports[0])
    } else if (docType === dbSubmissionTypes.finalReport) {
      documentsToChange.push(studentDocs.entity.finalReports[0])
    }
  }

  for (const document of documentsToChange) {
    document.deadLine = deadline
    const response = await updateSubmission(docType, document)
    if (response.status !== 200) {
      return false
    }
  }
  return true
}


// /coordinator/updateReader?readerID={readerID}&initialReportID={initialReportID}
export const updateReader = async (readerId, initialReportID) => {
  const request = await generalFunctions.postToAPI(`/coordinator/updateReader?readerID=${readerId}&initialReportId=${initialReportID}`)
  console.log('REQUEST')
  return request
}
// /coordinator/updateOpponent?opponentID={opponentID}&initialReportID={initialReportID}
export const updateOpponent = async (opponentID, initialReportID) => {
  const request = await generalFunctions.postToAPI(`/coordinator/updateOpponent?opponentID=${opponentID}&initialReportID=${initialReportID}`)
  console.log('REQUEST')
}