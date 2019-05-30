import { lineHeight } from "./TableStyles";

const standardBorder = '1px solid black'
const lnuYellow = '#ffee00'
const rowHeight = '15px'
/* ---- Reports ---- */

export const reportBody = {
  border: standardBorder,

}

export const reportBox = {
  width: '60%',
  border: '2px solid black',
  margin: '0 auto',
  marginTop: '10px'
}

export const reportBoxHeader = {
  width: '100%',
  height: '20px',
  lineHeight: '20px',
  textAlign: 'center',

}

export const reportBoxRow = {
  width: '100%',
  border: '1px solid black',
  height: rowHeight,
  lineHeight: rowHeight,
}

export const reportBoxRowSymbol = {
  float: 'right',
  marginRight: '15px'
}