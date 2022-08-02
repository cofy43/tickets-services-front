const style = {
  backgroundColor: "rgb(95, 72, 246)",
  color: "white",
  appearance: "button",
  backfaceVisibility: "hidden",  
  borderRadius: "6px",
  borderWidth: 0,
  cursor: "pointer",
  fontSize: "0.75rem",
  fontweight: "bold",
  textTransform: "uppercase",
  height: "40px",
  padding: "0 25px",
  textAlign: "center",
  width: "max-content",
}

export default function CustomButton(props) {
  return (
    <button
      type={props.type ? props.type : ""}
      style={style}
      onClick={props.onClick}
      disable={props.disable !== undefined ? props.disable : false}
    >
      {props.children}
    </button>
  );
}