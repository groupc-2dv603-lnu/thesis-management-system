import * as generalFunctions from "../../../../functions";

export const getInitialReports = async () => {
  try {
    const response = await generalFunctions.getFromAPI(
      `/coordinator/getAllReports`
    );
    const uploadedReports = response.entity.filter(
      report => report.submissionId !== ""
    );

    for (const report of uploadedReports) {
      const user = await generalFunctions.getUser(report.userId);
      report.name = generalFunctions.capitalizeFirstLetter(user.entity.name);
    }
    uploadedReports.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
    return uploadedReports;
  } catch (e) {
    console.log(e);
  }
};

export const getUsers = async userIds => {
  let users = [];
  for (const id of userIds) {
    let user = await generalFunctions.getUser(id);
    let obj = {
      name: generalFunctions.capitalizeFirstLetter(user.entity.name),
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
    const user = await generalFunctions.getUser(opponent.userId);
    opponent.name = user.entity.name;
    availableOpponents.push(opponent);
  }
  return availableOpponents;
};
