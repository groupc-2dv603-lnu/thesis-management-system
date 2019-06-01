import moment from "moment";
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
 * @param {String} SubmissionType - "pd", "pp", "ir", "fr"
 * @param {Object} object - object to update, will be JSON stringified
 */
export const updateSubmission = async (submissionType, object) => {
  const submissionObject = await JSON.stringify(object);
  console.log('SUBOBJ', submissionObject)
  let url = "";
  if (submissionType === "pd") {
    url = "http://localhost:8080/coordinator/updateProjectDescription";
  } else if (submissionType === "pp") {
    url = "http://localhost:8080/coordinator/updateProjectPlan";
  } else if (submissionType === "ir") {
    url = "http://localhost:8080/coordinator/updateInitialReport";
  } else if (submissionType === "fr") {
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
  console.log("REQUEST", request);
  return request;
};

