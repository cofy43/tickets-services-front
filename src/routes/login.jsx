import React, { useState } from "react";

/** Materia UI */
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/InputBase";

/** API */
import { login } from "../api/auth";

/** React Router */
import { useNavigate } from "react-router-dom";

/** Components */
import ModalMessage from "../componets/modalMessage";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const styleTitle = {
  fontFamily: "San Francisco",
  fontSize: "24px",
  fontWeight: "bold",
};

const styleTextField = {
  backgroundColor: "rgb(234, 234, 234)",
  padding: ".7rem",
  borderRadius: "4px",
  marginTop: "10px",
};

const defaultValues = {
  email: "",
  password: "",
};

export default function Login(props) {
  const history = useNavigate();
  const [formValues, setFormValues] = useState(defaultValues);

  const [message, setMessage] = useState("");
  const [openSecondModal, setOpenSecondModal] = useState(false);
  const [successAction, setSuccessAction] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  async function logIn() {
    const res = await login(formValues);
    if (res.ok) {
      setFormValues(defaultValues);
      props.handleClose();
      history("/dashboard", { replace: true });
    } else {
      setSuccessAction(false);
      setMessage(res.message);
      setOpenSecondModal(true);
    }
  }

  const handleClose = () => {
    setFormValues(defaultValues);
    props.handleClose();
  };

  const handleCloseSecond = () => {
    setMessage("");
    setSuccessAction(false);
    setOpenSecondModal(false);
  };

  function validateEmail() {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(formValues.email).toLowerCase());
  }

  function validForm() {
    let validEmail = validateEmail()
    return validEmail && formValues.password.length > 0;
  }

  return (
    <Modal open={props.open} onClose={handleClose}>
      <Box sx={style}>
        <div style={styleTitle}>Inicia sesión</div>
        <TextField
          sx={styleTextField}
          error={!formValues.email || !validateEmail()}
          placeholder="Correo Electrónico"
          name="email"
          value={formValues.email}
          type="email"
          onChange={handleInputChange}
          required
          fullWidth
        />
        <TextField
          sx={styleTextField}
          error={!formValues.password}
          type="password"
          placeholder="Contraseña"
          name="password"
          value={formValues.password}
          onChange={handleInputChange}
          required
          fullWidth
        />
        <Button
          onClick={() => logIn()}
          disabled={!validForm()}
          sx={{ marginTop: "10px" }}
          fullWidth
        >
          Iniciar sesion
        </Button>
        <ModalMessage
          open={openSecondModal}
          successAction={successAction}
          message={message}
          handleClose={handleCloseSecond}
        />
      </Box>
    </Modal>
  );
}
