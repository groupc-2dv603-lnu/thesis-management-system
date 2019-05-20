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