const lnuYellow = '#ffee00';
const standardBorder = '1px solid black'
const rowHeight = '30px'
const boldBorder = '2px solid black'
const lightgrey = "#eff0f2"


/* ---- NavigationButtons ---- */
export const submissionMenu = {
  height: "40px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  background: lnuYellow,
  borderBottom: boldBorder,
  marginBottom: '20px'

};

export const menuButtons = {
  borderRight: standardBorder,
  width: "25%",
  height: '40px',
  lineHeight: '40px',
  textAlign: "center",
  background: lnuYellow,
  fontSize: '14px'
};

/* ---  SubmissionBox  --- */
export const subBoxDiv = {
  margin: '0 auto',
  width: '80%',
  border: standardBorder,
  marginBottom: '20px'
}
export const subBoxHeader = {
  borderBottom: standardBorder,
  borderRight: standardBorder,
  textAlign: "center",
  fontWeight: "bold",
  height: "40px",
  lineHeight: "40px",
  background: lnuYellow
};

export const submissionRow = {
  borderTop: standardBorder,
  borderBottom: standardBorder,
  height: rowHeight,
  width: "100%"
};

export const submissionLeftColumn = {
  borderRight: standardBorder,
  width: "25%",
  height: "100%",
  float: "left",
  lineHeight: rowHeight,
  fontWeight: "bold",
  background: lightgrey
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

export const submissionInputColumn = {
  width: '100%',
  border: 'none',
}

export const select = {
  background: 'white',
  border: '1px solid black'
}

export const submitRow = {
  width: '100%',
  textAlign: 'center',
  height: rowHeight,
  lineHeight: rowHeight,
  background: 'lightgrey',
  fontWeight: 'bold',
  borderTop: standardBorder,
  borderBottom: standardBorder
}

export const downloadSpan = {
  float: 'right',
  marginRight: '15px'
}

/* ---- COMMENT ----- */

export const commentRow = {
  borderTop: standardBorder,
  borderBottom: standardBorder,
  height: '100px',
  width: "100%"
}

export const commentLeftColumn = {
  borderRight: standardBorder,
  width: "25%",
  height: "100%",
  float: "left",
  lineHeight: '100px',
  fontWeight: "bold",
  background: lightgrey
}

export const commentRightColumn = {
  height: "100%",
  float: "left",
  lineHeight: '100px',
  marginLeft: "3px"
}

export const textArea = {
  border: 'none',
  width: '340px',
  height: '90%',
  resize: 'none',
  padding: '2px'
  
}

/* ---- feedback ---- */
export const feedbackBox = {
  border: standardBorder,
  margin: '0 auto',
  width: '80%',
  marginTop: '10px',
}

export const feedbackHeader = {
  height: '20px',
  lineHeight: '20px',
  textAlign: 'center',
  borderBottom: standardBorder,
  borderRight: standardBorder,
  background: lightgrey
}

export const feedbackText = {
  margin: '5px'
}
export const textarea = {
  height: "90%",
  width: "180%",
  border: 'none',
  resize: 'none',
  padding: '2px'
};

export const showFeedback = {
  width: '100%',
  height: rowHeight,
  lineHeight: rowHeight,
  background: lightgrey,
  textAlign: 'center',
  marginTop: rowHeight,
  borderTop: standardBorder
}

export const feedbackBody = {
  marginBottom: '30px',
}