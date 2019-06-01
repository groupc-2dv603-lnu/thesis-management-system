import moment from "moment";
import * as generalFunctions from '../../functions'
import { dbTypes } from '../../enums'

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
 * @param {String} dbType 
 * @param {Object} object - object to update, will be JSON stringified
 */
export const updateSubmission = async (dbType, object) => {
  const submissionObject = await JSON.stringify(object);

  let url = "";
  if (dbType === dbTypes.projectDescription) {
    url = "http://localhost:8080/coordinator/updateProjectDescription";
  } else if (dbType === dbTypes.projectPlan) {
    url = "http://localhost:8080/coordinator/updateProjectPlan";
  } else if (dbType === dbTypes.initialReport) {
    url = "http://localhost:8080/coordinator/updateInitialReport";
  } else if (dbType === dbTypes.finalReport) {
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

