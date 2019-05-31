//popup surrounding area
const innerWidth = "20%"; 
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
  marginTop: '-5%',
  background: "white",
  maxWidth: '600px', // Sets width of popup
  minWidth: '500px',
  heigth: '80%',
  border: '2px solid black',
  borderRadius: '5px',
  overflow: 'auto',

};

export const closeButtonDiv = {
  width: '100%',
  height: '25px'
}

export const popupClose = {
  float: "right",
  width: "30px",
  height: "30px",
  marginTop: "5px",
  marginRight: "5px"
};

export const popupHeader = {
  width: "100%",
  textAlign: "center",
};


export const popupSupervisor = {
  width: '100%',
  textAlign: 'center',
  marginTop: '-5px',
  borderBottom: '1px solid black'

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

export const submitDiv = {
  marginTop: '20px',
  width: '100%',
  textAlign: 'center'
}

