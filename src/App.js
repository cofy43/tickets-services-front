import React, { useState } from "react";

/** Materia UI */
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";

/** Views */
import Home from "./routes/home";
import Login from "./routes/login";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(95, 72, 246)",
          fontSize: "0.75rem",
          height: "40px",
          padding: "0px 25px",
          fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
          color: "white"
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "rgb(0 0 0 / 10%) 0px 8px 32px",
          textAlign: "center",
          ":disabled": {
            color: "black"
          }
        },
      }
    },
    MuiGrid: {
      styleOverrides: {
        container: {
          padding: "2rem"
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "black"
        }
      }
    }
  },
});

export default function App() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <nav>
          <Button variant="contained" onClick={handleClick}>
            iniciar sesion
          </Button>
        </nav>
        <main className="flex-container">
          <Home />
          <Login open={open} handleClose={handleClose}/>
        </main>
      </div>
    </ThemeProvider>
  );
}
