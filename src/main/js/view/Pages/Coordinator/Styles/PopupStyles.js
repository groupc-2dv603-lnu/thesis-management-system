
//popup surrounding area
const innerWidth = "40%"; 
const innerHeight = "15%";

//Area around popupWindow
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

//The popupwindow
export const popupInner = {
  position: "absolute",
  left: innerWidth,
  right: innerWidth,
  top: innerHeight,
  bottom: innerHeight,
  margin: "auto",
  background: "white",
  maxWidth: '600px',
  minWidth: '500px',
  heigth: '100%'
};

export const popupClose = {
  float: "right",
  width: "20px",
  height: "20px",
  margin: "10px"
};

export const popupHeader = {
  width: "100%",
  textAlign: "center"
};

export const popupBody = {
  border: '2px solid blue',
  width: '90%',
  margin: '0 auto'
}

export const submitButton = {
  height: '30px',
  marginLeft: '40%',
  marginTop: '5px'
}