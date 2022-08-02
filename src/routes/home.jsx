import React, { useState } from "react";

/** Materia UI */
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

/** Images */
import Succes from "../assets/success.svg";
import Error from "../assets/error.svg";

/** API */
import { createATicket } from "../api/tickets";

const defaultValues = {
  name: "",
  fatherLastName: "",
  motherLastName: "",
  email: "",
  phone: "",
};

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

export default function Home() {
  const [formValues, setFormValues] = useState(defaultValues);
  const [open, setOpen] = useState(true);
  const [successAction, setSuccessAction] = useState(true);
  const [message, setMessage] = useState(
    "Su número de ticket es: Homely-12, se le será notificado sobre el progreso del ticket"
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  async function create() {
    let res = await createATicket({ client: formValues });
    setMessage(res.message);
    setSuccessAction(res.ok);
    if (res.ok) {
      resetValues();
    }    
    setOpen(true);
  }

  function resetValues() {
    setFormValues(defaultValues);
  }

  function isValidForm() {
    return (
      formValues.name.length > 0 &&
      formValues.fatherLastName.length > 0 &&
      formValues.motherLastName.length > 0 &&
      (formValues.email.length > 0 || formValues.phone.length > 0)
    );
  }

  const handleClose = () => {
    setOpen(false);
    setMessage("");
  }

  return (
    <>
      <Grid container spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={7}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h6">¿Tuviste algún problema?</Typography>
              <Typography variant="h6">Cuentanos</Typography>
              <Grid
                rowSpacing={4}
                container
                width={"100%"}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={4}>
                  <TextField
                    error={!formValues.name}
                    label="Nombre"
                    name="name"
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    error={!formValues.fatherLastName}
                    label="Apellido Paterno"
                    name="fatherLastName"
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    error={!formValues.motherLastName}
                    label="Apellido Materno"
                    name="motherLastName"
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Número telefónico"
                    name="phone"
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Correo electrónico"
                    name="email"
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button disabled={!isValidForm()} onClick={() => create()}>
                    Enviar
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h6">
                ¿Quieres saber el estatus de ti ticket?
              </Typography>
              <Typography variant="h6">Puedes consultarlo aquí</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Modal open={open}>
        <Box sx={style}>
          {successAction ? (
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
          {message}
          <hr/>
          <Button onClick={handleClose} sx={styleCloseButton}>Cerrar</Button>
        </Box>
      </Modal>
    </>
  );
}
