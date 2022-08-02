const styleGroup = {
  position:"relative",
  marginBottom:"45px",
}

const styleInput = {
  fontFamily: "Roboto, sans-serif",
  fontSize:"16px",
  padding:"0px 22px",
  display:"block",
  maxWidth:"200px",
  border:"none",
  backgroundColor: "rgb(234, 234, 234)",
  borderRadius: "4px",
  height: "50px"
}

const styleLabe = {
  fontFamily: "Roboto, sans-serif",
  color:"rgb(93 72 245)", 
  fontSize:"16px",
  fontWeight:"normal",
  position:"absolute",
  pointerEvents:"none",
  left:"5px",
  top:"-20px",  
}

export default function CustomInput(props) {
  return (
    <div style={styleGroup}>      
      <input style={styleInput} type={props.type ? props.type : "text"} required={props.required}/>
      <span className="bar"></span>
      <label style={styleLabe}>{props.label}</label>
    </div>
  );
}