import React, { useEffect, useState } from "react";

/** Material UI */
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";

/** Components */
import ModalMessage from "../componets/modalMessage";
import CustomTable from "../componets/customTable";

/** API */
import { pendingTickets, completedTickets, getInfo } from "../api/member";
import { logout } from "../api/auth";
import { getDetail, updateTicket } from "../api/tickets";

/** Theme */
import { theme } from "../utils/theme";

/** React Router */
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import { PacmanLoader } from "react-spinners";

/** Moment */
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

const defaultValues = {
  name: "",
  fatherLastName: "",
  motherLastName: "",
  activeTickets: 0,
  totalTickets: 0,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  backgroundColor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const styleTextField = {
  backgroundColor: "rgb(234, 234, 234)",
  padding: ".7rem",
  borderRadius: "4px",
  marginTop: "10px",
};

const spinner = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  zIndex: '9999',
};

export default function Dashboard() {
  const history = useNavigate();
  // Member data
  const [memberInfo, setMemberInfo] = useState(defaultValues);
  const [todoList, setTodoList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  // Modal message
  const [message, setMessage] = useState([]);
  const [openMessage, setOpenMessage] = useState(false);
  const [successAction, setSuccessAction] = useState(false);
  // Modal detail
  const [open, setOpen] = useState(false);
  const [ticketId, setTicketId] = useState(null);
  const [ticketInfo, setTicketInfo] = useState(null);
  const [ticketStatus, setTicketStatus] = useState(null);
  const [ticketNotes, setTicketNotes] = useState("");

  const [loading, setLoading] = React.useState(false); //loading spiner

  const nexIcon = <i class="fa-solid fa-angles-right"></i>;
  const endIcon = <i class="fa-regular fa-circle-check"></i>;

  axios.interceptors.request.use(
    (conf) => {
      setLoading(true);
      return conf;
    },
    (error) => {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (res) => {
      setLoading(false);
      return res;
    },
    async (err) => {
      setLoading(false);
      await handleError(err);
      return Promise.reject(err);
    }
  );

  function handleError(err) {
    if (err.response.status === 401) {
      history("/", { replace: true });
    }    
  }

  useEffect(() => {
    async function fetchData() {
      const resMember = await getInfo();
      const resTodo = await pendingTickets();
      const resCompleted = await completedTickets();
      let messageErrors = "";
      if (resMember.ok) {
        setMemberInfo(resMember.data);
      } else {
        messageErrors += resMember.message + "\n";
      }

      if (resTodo.ok) {
        setTodoList(
          resTodo.data.map((ticket) => {
            ticket.createdAt = parseDate(ticket.createdAt);
            ticket.updatedAt = parseDate(ticket.updatedAt);
            return ticket;
          })
        );
      } else {
        messageErrors += resTodo.message + "\n";
      }

      if (resCompleted.ok) {
        setCompletedList(
          resCompleted.data.map((ticket) => {
            ticket.createdAt = parseDate(ticket.createdAt);
            ticket.updatedAt = parseDate(ticket.updatedAt);
            return ticket;
          })
        );
      } else {
        messageErrors += resCompleted.message + "\n";
      }

      if (messageErrors.length) {
        setMessage(messageErrors);
        setOpenMessage(true);
        setSuccessAction(false);
      }
    }

    if (!openMessage) {
      fetchData();
    }
  }, [openMessage]);

  async function logOut() {
    const res = await logout();
    if (res.ok) {
      history("/", { replace: true });
    }
  }

  const handleCloseMessage = () => {
    setMessage("");
    setOpenMessage(false);
    setSuccessAction(true);
  };

  const handleClose = () => {
    resetModalValues();
  };

  function parseDate(dateString) {
    return moment(dateString).format("DD/MM/YYYY");
  }

  async function getTicketDetail(id) {
    let res = await getDetail(id);
    if (res.ok) {
      setTicketId(id);
      res.data.createdAt = parseDate(res.data.createdAt);
      res.data.updatedAt = parseDate(res.data.updatedAt);
      setTicketInfo(res.data);
      setTicketNotes(res.data.notes);
      setTicketStatus(res.data.status.id);
      setOpen(true);
    } else {
      setMessage(res.message);
      setSuccessAction(false);
      setOpenMessage(true);
    }
  }

  const handleInputChange = (e) => {
    const { value } = e.target;
    setTicketInfo({ ...ticketInfo, "notes": value });
  };

  function haveChanges() {    
    return ticketInfo.status.id !== ticketStatus || ticketInfo.notes !== ticketNotes;
  }

  async function saveChanges() {
    const body = {newStatusId: ticketStatus, notes: ticketInfo.notes}    
    let res = await updateTicket(ticketId, body);
    if (res.ok) {
      resetModalValues();
    }
    setMessage(res.message);
    setOpenMessage(true);
    setSuccessAction(res.ok)
  }

  function resetModalValues() {
    setTicketId(null);
    setTicketInfo(null);
    setTicketStatus(null);
    setTicketNotes("");
    setOpen(false);
  }

  return (
    <ThemeProvider theme={{ ...theme }}>
      <div>
        <nav>
          <Button onClick={() => logOut()} variant="contained">
            cerrar sesión
          </Button>
        </nav>
        <main>
          <div style={spinner}>
            <PacmanLoader color={'#2A7DE1'} loading={loading} size={25} />
          </div>
          <Grid container sx={{ width: "100%" }}>
            <Grid item p={"2rem"} sx={{ width: "100%" }}>
              <Card sx={{ width: "100%" }}>
                <CardContent>
                  <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={2}>
                      <Typography variant="h1">
                        <i class="fa-solid fa-user-tie"></i>
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography
                        variant="overline"
                        sx={{ color: "rgb(95, 72, 246)" }}
                      >
                        Nombre:
                      </Typography>
                      <Typography>{memberInfo.name}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography
                        variant="overline"
                        sx={{ color: "rgb(95, 72, 246)" }}
                      >
                        Apellido Paterno:
                      </Typography>
                      <Typography>{memberInfo.fatherLastName}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography
                        variant="overline"
                        sx={{ color: "rgb(95, 72, 246)" }}
                      >
                        Apellido Materno:
                      </Typography>
                      <Typography>{memberInfo.motherLastName}</Typography>
                    </Grid>
                    <Grid item xs={1.5}>
                      <Typography
                        variant="overline"
                        sx={{ color: "rgb(95, 72, 246)" }}
                      >
                        Tickets activos:
                      </Typography>
                      <Typography>{memberInfo.activeTickets}</Typography>
                    </Grid>
                    <Grid item xs={1.5}>
                      <Typography
                        variant="overline"
                        sx={{ color: "rgb(95, 72, 246)" }}
                      >
                        Tickets totales:
                      </Typography>
                      <Typography>{memberInfo.totalTickets}</Typography>
                    </Grid>

                    <Grid sx={{ alignSelf: "normal" }} item xs={6}>
                      {todoList.length && (
                        <>
                          <Typography variant="h6">Pendientes</Typography>
                          <CustomTable
                            list={todoList}
                            onDoubleClick={(id) => getTicketDetail(id)}
                          />
                        </>
                      )}
                    </Grid>
                    <Grid sx={{ alignSelf: "normal" }} item xs={6}>
                      {completedList.length && (
                        <>
                          <Typography variant="h6">Completados</Typography>
                          <CustomTable
                            list={completedList}
                            onDoubleClick={(id) => getTicketDetail(id)}
                          />
                        </>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Modal open={open} onClose={handleClose}>
            <Box style={style}>
              {ticketInfo && (
                <Grid
                  container
                  rowSpacing={2}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={12} sx={{ textAlign: "center" }}>
                    <Typography variant="h5">
                      Ticket: {ticketInfo.name}
                    </Typography>
                    <hr />
                  </Grid>
                  {!ticketInfo.status.esFinal && (
                    <>
                      {ticketInfo.status.previusStatus && (
                        <Grid alignItems="center" item xs={4}>
                          <Button
                            onClick={() => setTicketStatus(ticketInfo.status.previusStatusId)}
                            startIcon={<i class="fa-solid fa-angles-left"></i>}
                            variant={
                              ticketInfo.status.previusStatusId === ticketStatus
                                ? "contained"
                                : "outlined"
                            }
                          >
                            {ticketInfo.status.previusStatus}
                          </Button>
                        </Grid>
                      )}
                      <Grid item xs={ticketInfo.status.previusStatus ? 4 : 6}>
                        <Button
                          onClick={() => setTicketStatus(ticketInfo.status.id)}
                          variant={
                            ticketInfo.status.id === ticketStatus
                              ? "contained"
                              : "outlined"
                          }
                        >
                          {ticketInfo.status.name}
                        </Button>
                      </Grid>
                      <Grid item xs={ticketInfo.status.previusStatus ? 4 : 6}>
                        <Stack width="150px" spacing={1}>
                          {ticketInfo.status.nextStatus &&
                            ticketInfo.status.nextStatus.map(
                              (nextStatus, indx) => (
                                <Button
                                  onClick={() => setTicketStatus(nextStatus.id)}
                                  endIcon={
                                    nextStatus.esFinal ? endIcon : nexIcon
                                  }
                                  key={indx}                                  
                                  variant={
                                    nextStatus.id === ticketStatus
                                      ? "contained"
                                      : "outlined"
                                  }
                                >
                                  {nextStatus.statusName}
                                </Button>
                              )
                            )}
                        </Stack>
                      </Grid>
                    </>
                  )}
                  {ticketInfo.status.esFinal && (
                    <Grid item xs={12}>
                      <Button
                        endIcon={<i class="fa-regular fa-circle-check"></i>}
                      >
                        {ticketInfo.status.name}
                      </Button>
                    </Grid>
                  )}
                  <Grid item xs={6}>
                    <Typography>Creado: {ticketInfo.createdAt}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>Actualizado: {ticketInfo.updatedAt}</Typography>
                  </Grid>
                  {/* <Grid sx={{ margin: "0" }} item xs={12}>
                    <Typography>Cliente:</Typography>
                  </Grid> */}
                  <Grid item xs={4}>
                    <Typography>
                      Nombre: {ticketInfo.client.name}{" "}
                      {ticketInfo.client.fatherLastName}{" "}
                      {ticketInfo.client.motherLastName}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography>Email: {ticketInfo.client.email}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Teléfono: {ticketInfo.client.phone}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    Notas:
                    <TextField
                      disabled={ticketInfo.status.esFinal}
                      sx={styleTextField}
                      placeholder="Notas"
                      name="notes"
                      value={ticketInfo.notes}
                      type="text"
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid sx={{ textAlign: "right" }} item xs={12}>
                    <hr />
                    <Stack direction="row-reverse" spacing={1}>                      
                      <Button
                        onClick={() => saveChanges()}
                        disabled={!haveChanges()}
                        startIcon={<i class="fa-regular fa-floppy-disk"></i>}
                      >
                        guardar
                      </Button>
                      <Button
                        onClick={handleClose}
                        startIcon={<i class="fa-solid fa-ban"></i>}
                      >
                        cancelar
                      </Button>
                    </Stack>                    
                  </Grid>
                </Grid>
              )}
            </Box>
          </Modal>

          <ModalMessage
            open={openMessage}
            successAction={successAction}
            message={message}
            handleClose={handleCloseMessage}
          />
        </main>
      </div>
    </ThemeProvider>
  );
}
