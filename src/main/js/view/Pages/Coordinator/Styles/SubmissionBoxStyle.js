const lnuYellow = '#ffee00';
const standardBorder = '1px solid black'
const rowHeight = '30px'

/* ---- NavigationButtons ---- */
export const submissionMenu = {
  height: "50px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginBottom: "20px"
};

export const menuButtons = {
  border: standardBorder,
  width: "80px",
  textAlign: "center",
};

/* ---  SubmissionBox  --- */

export const subBoxHeader = {
  border: standardBorder,
  textAlign: "center",
  fontWeight: "bold",
  height: "40px",
  lineHeight: "40px"
};

export const submissionRow = {
  border: standardBorder,
  height: rowHeight,
  width: "100%"
};

export const submissionLeftColumn = {
  borderRight: standardBorder,
  width: "25%",
  height: "100%",
  float: "left",
  lineHeight: rowHeight,
  marginLeft: "3px",
  fontWeight: "bold"
};
export const submissionRightColumn = {
  height: "100%",
  float: "left",
  lineHeight: rowHeight,
  marginLeft: "3px"
};

export const submissionEditColumn = {
  float: "right",
  lineHeight: rowHeight,
  marginRight: "5px"
};

/* ---- feedback ---- */
export const submissionFeedbackRow = {
  height: '120px',
  borderTop: standardBorder,
  borderLeft: standardBorder
}
export const textarea = {
  height: "90%",
  width: "180%",
  border: 'none',
  resize: 'none',
  padding: '2px'
};

export const submissionFeedbackFromRow = {
  borderLeft: standardBorder,
  borderRight: standardBorder,
  borderBottom: standardBorder,
  height: rowHeight,
  width: '100%'
}

export const submissionInputColumn = {
  width: '100%',
  border: 'none',
}

export const select = {
  background: 'white',
  border: '1px solid black'
}