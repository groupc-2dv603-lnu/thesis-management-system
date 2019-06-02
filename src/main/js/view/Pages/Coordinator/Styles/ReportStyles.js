import { lineHeight } from "./TableStyles";

const standardBorder = '1px solid black'
const lnuYellow = '#ffee00'
const rowHeight = '25px'
const headerHeight = '30px'
/* ---- Reports ---- */

export const reportBody = {

}

export const reportBox = {
  width: '60%',
  border: standardBorder,
  margin: '0 auto',
  marginTop: '20px'
}

export const reportBoxHeader = {
  width: '100%',
  height: headerHeight,
  lineHeight: headerHeight,
  textAlign: 'center',
  background: lnuYellow,
  borderBottom: standardBorder

}

export const reportBoxRow = {
  width: '100%',
  height: rowHeight,
  lineHeight: rowHeight,
  marginLeft: '5px'
}

export const reportBoxRowSymbol = {
  float: 'right',
  marginRight: '15px',
  lineHeight: rowHeight
}