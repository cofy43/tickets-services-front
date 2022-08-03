import React, { useEffect, useState } from "react";

/** Material UI */
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";


/** Components */
import ModalMessage from "../componets/modalMessage";
import CustomTable from "../componets/customTable";

/** API */
import { pendingTickets, completedTickets, getInfo } from "../api/member";
import { logout } from "../api/auth";

/** Theme */
import { theme } from "../utils/theme";

/** React Router */
import { useNavigate } from "react-router-dom";

/** Moment */
import moment from "moment";
import 'moment/locale/es';
moment.locale('es');

const defaultValues = {
  name: "",
  fatherLastName: "",
  motherLastName: "",
  activeTickets: 0,
  totalTickets: 0,
};

export default function Dashboard() {
  const history = useNavigate();
  const [memberInfo, setMemberInfo] = useState(defaultValues);
  const [todoList, setTodoList] = useState([]);
  const [completedList, setCompletedList] = useState([]);

  const [message, setMessage] = useState([]);
  const [open, setOpen] = useState(false);
  const [successAction, setSuccessAction] = useState(false);

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
        setTodoList(resTodo.data.map((ticket) => {
          ticket.createdAt = parseDate(ticket.createdAt);
          ticket.updatedAt = parseDate(ticket.updatedAt);
          return ticket;
        }));
      } else {
        messageErrors += resTodo.message + "\n";
      }

      if (resCompleted.ok) {        
        setCompletedList(resCompleted.data.map((ticket) => {
          ticket.createdAt = parseDate(ticket.createdAt);
          ticket.updatedAt = parseDate(ticket.updatedAt);
          return ticket;
        }));
      } else {
        messageErrors += resCompleted.message + "\n";
      }

      if (messageErrors.length) {
        setMessage(messageErrors);
        setOpen(true);
        setSuccessAction(false);
      }      
    }

    if (!open) {
      fetchData();
    }
  }, [open]);

  async function logOut() {
    const res = await logout();
    if (res.ok) {
      history("/", { replace: true });
    }
  }

  const handleClose = () => {
    setMessage("");
    setOpen(false);
    setSuccessAction(true);
  };

  function parseDate(dateString) {
    return moment(dateString).format('DD/MM/YYYY');
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <nav>
          <Button onClick={() => logOut()} variant="contained">
            cerrar sesión
          </Button>
        </nav>
        <main>
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
                      <Typography variant="overline">Nombre:</Typography>
                      <Typography>{memberInfo.name}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="overline">
                        Apellido Paterno:
                      </Typography>
                      <Typography>{memberInfo.fatherLastName}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="overline">
                        Apellido Materno:
                      </Typography>
                      <Typography>{memberInfo.motherLastName}</Typography>
                    </Grid>
                    <Grid item xs={1.5}>
                      <Typography variant="overline">
                        Tickets activos:
                      </Typography>
                      <Typography>{memberInfo.activeTickets}</Typography>
                    </Grid>
                    <Grid item xs={1.5}>
                      <Typography variant="overline">
                        Tickets totales:
                      </Typography>
                      <Typography>{memberInfo.totalTickets}</Typography>
                    </Grid>

                    <Grid item xs={6}>
                      {todoList.length && (
                        <CustomTable list={todoList}/>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      {completedList.length && (
                        <CustomTable list={completedList}/>
                      )}
                    </Grid>
                  </Grid>
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
        </main>
      </div>
    </ThemeProvider>
  );
}
