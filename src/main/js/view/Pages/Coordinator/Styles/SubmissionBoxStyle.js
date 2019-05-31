const lnuYellow = '#ffee00';
const standardBorder = '1px solid black'
const rowHeight = '30px'

/* ---- NavigationButtons ---- */
export const submissionMenu = {
  height: "50px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginBottom: "20px",
};

export const menuButtons = {
  border: standardBorder,
  width: "25%",
  textAlign: "center",
  background: lnuYellow,
  fontWeight: 'bold',
  marginLeft: '3px'
};

/* ---  SubmissionBox  --- */
export const subBoxDiv = {
  margin: '0 auto',
  width: '80%',
  border: standardBorder,
}
export const subBoxHeader = {
  border: standardBorder,
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
  background: 'lightgrey'
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

export const noSubfound = {
  margin: '0 auto',
  border: standardBorder,
  textAlign: 'center'
}

export const submitRow = {
  width: '100%',
  textAlign: 'center',
  height: rowHeight,
  lineHeight: rowHeight,
  background: lnuYellow,
  fontWeight: 'bold',
  borderTop: standardBorder
}

export const downloadSpan = {
  float: 'right',
  marginRight: '15px'
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
  background: lnuYellow
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

