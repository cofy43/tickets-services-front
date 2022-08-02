import { Link } from "react-router-dom";

/** Materia UI */
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";

/** Views */
import Home from "./routes/home";

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
  return (
    <ThemeProvider theme={theme}>
      <div>
        <nav>
          <Button variant="contained">
            <Link to="/login">iniciar sesion</Link>
          </Button>
        </nav>
        <main className="flex-container">
          <Home />
        </main>
      </div>
    </ThemeProvider>
  );
}
