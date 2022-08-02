import React from "react";

/** Material UI */
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <nav>
        <Button>
          <Link to="/">cerrar sesión</Link>
        </Button>
      </nav>
      <main>Dashboard</main>
    </div>
  );
}
