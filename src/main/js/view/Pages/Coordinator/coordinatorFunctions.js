import moment from "moment";

export const validDeadline = deadline => {
  if (deadline === "T:00") {
    return false;
  }
 
  if (deadline.length !== 19) {
    return false
  }

  const deadLine = moment(deadline);
  const now = moment();

  if (now > deadLine) {
    return false;
  } else {
    return true;
  }
};
