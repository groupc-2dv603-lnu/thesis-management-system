/**
 * Styling for coordinator submission page
 * 
 */

/* ---- Popup style ---- */
export const innerSize = "30%";

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
  left: innerSize,
  right: innerSize,
  top: innerSize,
  bottom: innerSize,
  margin: "auto",
  background: "white"
};

export const popupClose = {
  float: 'right',
  width: '20px',
  height: '20px',
  margin: '10px'
}
/* ---- Submissions style ---- */
export const rowHeight = "30px";
export const lineHeight = "30px";

export const bodyDiv = {
  width: "80%",
  marginTop: "30px",
  marginLeft: "10%"
};

export const submissionDiv = {
  marginTop: "30px",
  border: "1px solid black"
};

export const submissionHeaderStyle = {
  fontSize: "14px",
  fontWeight: "bold",
  textAlign: "center",
  borderBottom: "1px solid black",
  height: "30px",
  background: "#ffee00",
  lineHeight: lineHeight
};

export const submissionRowStyle = {
  width: "100%",
  height: rowHeight,
  borderBottom: "1px solid black"
};

export const keyStyle = {
  width: "30%",
  height: rowHeight,
  lineHeight: lineHeight,
  float: "left",
  background: "lightgrey",
  borderRight: "1px solid black"
};

export const valueStyle = {
  width: "68%",
  float: "right",
  height: rowHeight,
  lineHeight: lineHeight
};

export const edit = {
  float: "right",
  lineHeight: lineHeight,
  marginRight: "10px"
};
