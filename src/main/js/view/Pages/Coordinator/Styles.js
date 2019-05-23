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
  border: "1px solid black"
};

export const nameColumnStyle = {
  minWidth: nameColumnMinWidth,
  width: nameColumnMinWidth
};

export const submissionColumnStyle = {
  textAlign: "center"
};

export const tooltip = {
  position: "relative",
  display: "inline-block",
  width: "100%",
  height: "20px",
  textAlign: "center",
  marginBottom: "10px"
};

/* ---- PopUp styles ---- */

const innerWidth = "30%";
const innerHeight = "10%";

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
  float: "right",
  width: "20px",
  height: "20px",
  margin: "10px"
};

export const popupName = {
  width: "100%",
  textAlign: "center"
};

/* ---  Submission  --- */

const submissionRowHeight = "50px";
const lnuYellow = "#ffee00";
const standardBorder = "1px solid black";

export const submissionDiv = {
  width: "80%",
  border: standardBorder,
  margin: '0 auto'
};

export const submissionHeader = {
  background: lnuYellow,
  border: standardBorder,
  textAlign: "center",
  fontWeight: 'bold',
  height: '40px',
  lineHeight: '40px'
}

export const submissionBody = {
  border: standardBorder,
}

export const submissionRow = {
  border: standardBorder,
  height: '30px',
  width: '100%'
}

export const submissionLeftColumn = {
  borderRight: standardBorder,
  width: '25%',
  height: '100%',
  float: 'left',
  lineHeight: '30px',
  marginLeft: '3px',
  fontWeight: 'bold'

}
export const submissionRightColumn = {
  height: '100%',
  float: 'left',
  lineHeight: '30px',
  marginLeft: '3px',

}

export const submissionEditColumn = {
  float: 'right',
  lineHeight: '30px',
  marginRight: '5px'
}

export const submissionMenu = {
  height: submissionRowHeight,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  background: lnuYellow,
  borderTop: "2px solid black",
  borderBottom: "2px solid black",
  marginBottom: '20px'
};

export const submissionButtons = {
  color: "black",
  border: standardBorder,
  background: lnuYellow,
  width: "15%",
  textAlign: "center",
  height: submissionRowHeight
};

export const submissionNotFoundDiv = {
  border: standardBorder,
  height: "100px",
  textAlign: "center",
  marginTop: "50px"
};
export const submissionNotFound = {
  fontWeight: "bold"
};

/* ---- feedback ---- */
export const submissionFeedbackRow = {
  height: '120px',
  borderTop: standardBorder,
  borderLeft: standardBorder
}
export const textarea = {
  height: "90%",
  width: "170%",
  border: 'none',
  resize: 'none',
  padding: '2px'
};

export const submissionFeedbackFromRow = {
  borderLeft: standardBorder,
  borderRight: standardBorder,
  borderBottom: standardBorder,
  height: '30px',
  width: '100%'
}

export const submitButton = {
  marginLeft: '40%',
  marginTop: '5px'
}

/* ---- Reports ---- */
export const bidsDiv = {
  border: standardBorder,
  width: '60%',
  margin: '20px auto'
}

export const reportTypeHeader = {
  border: standardBorder,
  height: '25px',
  lineHeight: '25px',
  background: lnuYellow,
  fontWeight: 'bold',
  width: '100%',
  display: 'inline-block',
  textAlign: 'center'
}

export const bidRow = {
  border: standardBorder,
  height: '20px',
  lineHeight: '20px'
}

export const plus = {
  float: 'right',
  marginRight: '3px',
  lineHeight: '20px'
}

export const noBids = {
  width: '100%',
  textAlign: 'center'
}