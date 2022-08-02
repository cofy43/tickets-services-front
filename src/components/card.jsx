export default function CustomCard(props) {
  const style = {
    boxShadow: "rgb(0 0 0 / 10%) 0px 8px 32px",
    width: props.width ? props.width : "auto",
    height: props.height ? props.height : "auto",
    padding: "1.5rem",
    margin: "1.5rem",    
  }

  return (
    <div className="inner-element" style={style}>
      {props.children}
    </div>
  )
}