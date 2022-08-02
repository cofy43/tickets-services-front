import React, { useState } from "react";

/** Materia UI */
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";

/** API */
import { createATicket, searchTicket } from "../api/tickets";

/** Components */
import ModalMessage from "../componets/modalMessage";

import moment from "moment";
import 'moment/locale/es';
moment.locale('es');

const defaultValues = {
  name: "",
  fatherLastName: "",
  motherLastName: "",
  email: "",
  phone: "",
};

const statusTagStyle = {
  width: "auto",
  padding: "5px 10px",
  borderRadius: "5px"
}

export default function Home() {
  // To create a ticket
  const [formValues, setFormValues] = useState(defaultValues);
  const [open, setOpen] = useState(false);
  const [successAction, setSuccessAction] = useState(true);
  const [message, setMessage] = useState("");

  // To find a ticket
  const [search, setSearch] = useState("");
  const [data, setData] = useState();
  const [ticketFouned, setTicketFouned] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  async function create() {
    let res = await createATicket({ client: formValues });    
    setMessage(res.message);
    setSuccessAction(res.ok);
    if (res.ok) {      
      setFormValues(defaultValues);
    }
    setOpen(true);
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

  async function find() {
    const result = await searchTicket(`ticketName=${search}`);
    setTicketFouned(result.ok)
    if (result.ok) {
      result.data.createdAt = parseDate(result.data.createdAt);
      result.data.updatedAt = parseDate(result.data.updatedAt);
      setData(result.data);
    } else {
      setSuccessAction(false);
      setMessage(result.message);
      setOpen(true);
    }
  }

  function parseDate(dateString) {
    return moment(dateString).format('LLLL');
  }

  return (
    <>
      <Grid
        container
        sx={{ marginTop: "calc(8%)" }}
        spacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid sx={{ height: "700px" }} item xs={7}>
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
                    value={formValues.name}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    error={!formValues.fatherLastName}
                    label="Apellido Paterno"
                    name="fatherLastName"
                    value={formValues.fatherLastName}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    error={!formValues.motherLastName}
                    label="Apellido Materno"
                    name="motherLastName"
                    value={formValues.motherLastName}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Número telefónico"
                    name="phone"
                    value={formValues.phone}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Correo electrónico"
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button
                    startIcon={<i class="fa-solid fa-paper-plane"></i>}
                    disabled={!isValidForm()}
                    onClick={() => create()}
                  >
                    Enviar
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid sx={{ height: "700px" }} item xs={5}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                ¿Quieres saber el estatus de ti ticket?
              </Typography>
              <Typography variant="h6">Puedes consultarlo aquí</Typography>
              <InputBase
                sx={{ ml: 1, flex: 1, mt: 2 }}
                placeholder="Búsqueda rápida"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => setSearch(e.target.value)}
              />
              <IconButton
                onClick={() => find()}
                sx={{ p: "10px" }}
                aria-label="search"
              >
                <i class="fa-solid fa-magnifying-glass"></i>
              </IconButton>
              {ticketFouned && (
                <Grid container rowSpacing={3.2}>
                  <Grid item xs={7}>
                    <Typography variant="overline" align="right">
                      No. de Ticket:
                    </Typography>
                    <Typography>{data.name}</Typography>
                  </Grid>
                  <Grid item xs={5} sx={{ alignContent: "center" }}>
                    <div
                      style={{
                        ...statusTagStyle,
                        backgroundColor: data.status.esFinal
                          ? "#00E676"
                          : "#FDD835",
                      }}
                    >
                      {data.status.name}
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="overline" align="right">
                      Creado:
                    </Typography>
                    <Typography>{data.createdAt}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="overline" align="right">
                      Última actualización:
                    </Typography>
                    <Typography>{data.updatedAt}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="overline" align="right">
                      Notas:
                    </Typography>
                    <Typography>{data.notes}</Typography>
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <ModalMessage
        open={open}
        successAction={successAction}
        message={message}
        handleClose={handleClose}
      />
    </>
  );
}
