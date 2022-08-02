import React from "react";

/** Components */
import CustomButton from "./button";

/** Images */
import Succes from "../assets/success.svg";
import Error from "../assets/error.svg";

const styleModal = {
  position: "fixed",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
};

const styleContent = {
  width: "500px",
  marginTop: "calc(20%)",
  height: "fit-content",
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "5px",
};

const styleHeader = {
  padding: "10px",
};

const syleTitle = {
  margin: 0,
};

const styleBody = {
  padding: "10px",
  borderBottom: "1px solid black",
};

const styleFooter = {
  marginTop: "10px",
  display: "flex",
  flexDirection: "row-reverse",
};

const styleImage = {
  width: "50px",
  height: "50px",
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
};

export default function CustomModalMessage(props) {
  if (!props.open) {
    return null;
  }

  return (
    <div style={styleModal} onClick={props.onClose}>
      <div style={styleContent} onClick={(e) => e.stopPropagation()}>
        <div style={styleHeader}>
          <div style={syleTitle}>
            {props.successAction ? (
              <img
                src={Succes}
                className="center"
                style={styleImage}
                alt="success svg"
              />
            ) : (
              <img
                src={Error}
                className="center"
                style={styleImage}
                alt="error svg"
              />
            )}
          </div>
        </div>
        <div style={styleBody}>{props.message}</div>
        <div style={styleFooter}>
          <CustomButton onClick={props.onClose}>Cerrar</CustomButton>
        </div>
      </div>
    </div>
  );
}
