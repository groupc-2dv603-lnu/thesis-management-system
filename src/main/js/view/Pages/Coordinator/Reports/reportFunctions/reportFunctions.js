import * as generalFunctions from "../../../../functions";

export const getInitialReports = async () => {
  try {
    let reports = [];

    const response = await generalFunctions.getFromAPI(
      `/coordinator/getAllReports`
    );
    for (const report of response.entity) {
      if (report.submissionId !== "") {
        const submission = await getSubmission(report.submissionId);
        if (submission.fileUrl !== "") {
          report.name = await getName(report.userId);
          reports.push(report);
        }
      }
    }
    return reports;
  } catch (e) {
    console.log(e);
  }
};

const getSubmission = async submissionId => {
  try {
    const response = await generalFunctions.getFromAPI(
      `/submissions/${submissionId}`
    );
    return response.entity;
  } catch (e) {
    console.log(e);
  }
};

export async function getName(userId) {
  try {
    const response = await generalFunctions.getFromAPI(`/users/${userId}`);
    return response.entity.name === undefined
      ? "User not found"
      : await generalFunctions.capitalizeFirstLetter(response.entity.name);
  } catch (e) {
    console.log(e);
  }
}

export const getUsers = async userIds => {
  let users = [];

  for (const id of userIds) {
    let name = await getName(id);
    let obj = {
      name: generalFunctions.capitalizeFirstLetter(name),
      userId: id
    };
    users.push(obj);
  }
  return users;
};

export const getAvailableOpponents = async () => {
  let availableOpponents = [];

  let response = await generalFunctions.getFromAPI(
    `/coordinator/getAllOpponents`
  );
  let opponents = response.entity;
  for (const opponent of opponents) {
    let name = await getName(opponent.userId);
    let obj = {
      name: !name ? "User not found" : name,
      userId: opponent.userId
    };
    availableOpponents.push(obj);
  }

  return availableOpponents;
};
