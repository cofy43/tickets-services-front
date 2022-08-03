import React from "react";

/** Material UI */
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

/** Images */
import Succes from "../assets/success.svg";
import Error from "../assets/error.svg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
  borderRadius: "10px"

};

const styleImage = {
  width: "50px",
  height: "50px",
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  padding: "1rem"
};

const styleCloseButton = {
  display: "flex",
  flexDirection: "row-reverse"
}

export default function ModalMessage(props) {
  return (
    <Modal open={props.open}>
      <Box sx={style}>
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
        {props.message}
        <hr />
        <Stack width="100%" direction="row-reverse">
        <Button onClick={props.handleClose} sx={styleCloseButton}>
          Cerrar
        </Button>
        </Stack>        
      </Box>
    </Modal>
  );
}
