import React, { useState } from "react";

/** Materia UI */
import { ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";

/** Views */
import Home from "./routes/home";
import Login from "./routes/login";

/** Theme */
import { theme } from "./utils/theme";


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
