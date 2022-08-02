import React, { useState } from "react";

/** Materia UI */
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/InputBase";

/** API */
import { login } from "../api/auth";

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
  marginTop: "10px"
}

const defaultValues = {
  email: "",
  password: "",
};

export default function Login(props) {
  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  async function logIn() {
    const res = await login(formValues);
    console.log(res);
  }

  const handleClose = () => {
    setFormValues(defaultValues);
    props.handleClose();
  }

  return (
    <Modal open={props.open} onClose={handleClose}>
      <Box sx={style}>
        <div style={styleTitle}>Inicia sesión</div>
        <TextField
          sx={styleTextField}
          error={!formValues.email}
          placeholder="Correo Electrónico"
          name="email"
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
          onChange={handleInputChange}
          required
          fullWidth          
        />
        <Button onClick={() => logIn()} disabled={!formValues.password && !formValues.email} sx={{marginTop: "10px"}} fullWidth>Iniciar sesion</Button>
      </Box>
    </Modal>
  );
}
