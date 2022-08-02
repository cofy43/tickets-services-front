import { Link } from "react-router-dom";

/** Materia UI */
import Button from "@mui/material/Button";

export default function Login() {
  return (
    <div>
      <nav>
        <Button>
          <Link to="/">cerrar sesión</Link>
        </Button>
      </nav>
      <main>Login</main>
    </div>
  );
}
