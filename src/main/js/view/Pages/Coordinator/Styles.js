/* ---- TABLE STYLING ---- */
export const headerBackgroundColor = "#ffe000";
export const headerFontColor = "black";
export const headerFontWeight = "bold";
export const nameColumnMinWidth = "40%";
export const headerRowHeight = 40;
export const lineHeight = 2;

export const headerNameCellStyle = {
  minWidth: nameColumnMinWidth,
  background: headerBackgroundColor,
  color: headerFontColor,
  fontWeight: headerFontWeight,
  height: headerRowHeight,
  lineHeight: lineHeight,
  border: "1px solid black"
};

// width is set in renderMethod
export const headerSubmissionStyle = {
  background: headerBackgroundColor,
  color: headerFontColor,
  fontWeight: headerFontWeight,
  height: headerRowHeight,
  lineHeight: lineHeight,
  border: "1px solid black",
};

export const nameColumnStyle = {
  minWidth: nameColumnMinWidth,
  width: nameColumnMinWidth
};

export const submissionColumnStyle = {
  textAlign: "center"
};

export const tooltip = {
  position: 'relative',
  display: 'inline-block',
  width: '100%',
  height: '20px',
  textAlign: 'center',
  marginBottom: '10px'
}

/* ---- PopUp styles ---- */

const innerWidth = "30%"
const innerHeight = "10%"

export const popup = {
  position: "fixed",
  width: "100%",
  height: "100%",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  margin: "auto",
  backgroundColor: "rgba(0,0,0, 0.5)"
};

export const popupInner = {
  position: "absolute",
  left: innerWidth,
  right: innerWidth,
  top: innerHeight,
  bottom: innerHeight,
  margin: "auto",
  background: "white"
};

export const popupClose = {
  float: 'right',
  width: '20px',
  height: '20px',
  margin: '10px'
}

/* --- Student Submission modules --- */ 
const submissionRowHeight = '50px'
const lnuYellow = '#ffee00'
const standardBorder = '1px solid black'

export const submissionDivStyle = {
  width: '100%',
}

export const submissionMenu = {
  height: submissionRowHeight,
}

export const submissionButtons = {
  color: 'black',
  background: lnuYellow,
  border: standardBorder, 
  width: '25%',
  height: submissionRowHeight,
  display: 'inline',
}

export const downloadSubmission = {
  color: 'black',
  background: lnuYellow,
  width: '200px',
  height: submissionRowHeight,
  marginBottom: '20px',
  marginTop: '20px'
}

export const popupForm = {
  width: '80%',
  margin: '0 auto',
  textAlign: 'center'
}

export const deadline = {
  borderBottom: standardBorder,
  height: submissionRowHeight,
  textAlign: 'left',
  lineHeight: '50px'
}

export const grade = {
  borderBottom: standardBorder,
  height: submissionRowHeight,
  textAlign: 'left',
  lineHeight: '50px'
}

export const input = {
  marginLeft: '20px'
}