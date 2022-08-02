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
    <button style={style} onClick={props.onClick}>
      {props.children}
    </button>
  )
}