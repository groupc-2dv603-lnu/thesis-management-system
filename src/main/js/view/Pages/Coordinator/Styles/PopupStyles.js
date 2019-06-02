//popup surrounding area
const innerWidth = "20%"; 
const innerHeight = "15%";
const lnuYellow = '#ffee00';
const boldBorder = '2px solid black'
const headerHeight = '35px'

//Area around popupWindow
export const popup = {
  position: "fixed",
  width: "100%",
  height: "100%",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  margin: "0 auto",
  backgroundColor: "rgba(0,0,0, 0.5)"
};

//The popupwindow
export const popupInner = {
  position: "absolute",
  left: innerWidth,
  right: innerWidth,
  top: innerHeight,
  bottom: innerHeight,
  margin: "0 auto",
  background: "white",
  maxWidth: '600px', // Sets width of popup
  minWidth: '500px',
  heigth: '80%',
  border: '2px solid black',
  borderRadius: '5px',
  overflow: 'auto',
  overflowX: 'hidden'
};

export const headerDiv = {
  borderBottom: boldBorder,
}

export const closeButtonDiv = {
  width: '100%',
  height: '22px',
  background: lnuYellow
}

export const popupClose = {
  float: "right",
  marginTop: "3px",
  marginRight: "5px",
};

export const popupHeader = {
  width: "100%",
  height: headerHeight,
  lineHeight: headerHeight,
  textAlign: "center",
  background: lnuYellow,
  fontSize: '18px',
  fontWeight: '700',
};


export const popupSupervisor = {
  width: '100%',
  height: headerHeight,
  lineHeight: headerHeight,
  textAlign: 'center',
  fontSize: '16px',
  fontWeight: '600',
  background: lnuYellow,
}

export const popupBody = {
  width: '100%',
  margin: '0 auto',
}

export const loading = {
  width: '100%',
  fontWeight: 'bold',
  textAlign: 'center',
  marginTop: '200px'
}

export const message = {
  textAlign: 'center',
  height: '30px',
  lineHeight: '30px',
  fontWeight: 'bold'
}

export const reportSubmitDiv = {
  width: '100%',
  textAlign: 'center'

}