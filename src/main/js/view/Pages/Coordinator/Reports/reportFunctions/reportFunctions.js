import * as generalFunctions from "../../../../functions";

/* NEED GET ALL INITIAL REPORTS 
export const getInitialReports = async () => {
  try {
    let reports = [];

    const response = await generalFunctions.getFromAPI(
      `/coordinator/getAllReports`
    );
    console.log(response)
    for (const report of response.entity) {
      if (report.submissionId !== "") {
        const submission = await getSubmission(report.submissionId)
        if (submission.fileUrl !== "") {
          console.log('REPORT', report)
          let reportObject = {
            name: getName(report.userId),
            bids: report.bids.length,
           // assignedReaders: report.assignedReaders.length,
           //opponent: report.assignedOpponents.length 
          }
          console.log('reportOBJECT', reportObject)
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
};
*/

const getSubmission = async (submissionId) => {
  try {
    const response = await generalFunctions.getFromAPI(`/submissions/${submissionId}`);
    return response.entity
  } catch (e) {
    console.log(e);
  }
}


export async function getName(userId) {
  try {
    const response = await generalFunctions.getFromAPI(`/users/${userId}`);
    return !response.entity.name ? 'User not found' : (
      await generalFunctions.capitalizeFirstLetter(response.entity.name)
    );
  } catch (e) {
    console.log(e);
  }
}