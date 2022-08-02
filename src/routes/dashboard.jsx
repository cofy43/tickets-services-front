import React, { useEffect, useState } from "react";

/** Material UI */
import Button from "@mui/material/Button";

/** Components */
import ModalMessage from "../componets/modalMessage";

/** API */
import { pendingTickets, completedTickets, getInfo } from "../api/member";

export default function Dashboard() {
  const [memberInfo, setMemberInfo] = useState(null);
  const [todoList, setTodoList] = useState([]);
  const [completedList, setCompletedList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resMember = await getInfo();
      const resTodo = await pendingTickets();
      const resCompleted = await completedTickets();
      console.log(resMember)
      console.log(resTodo)
      console.log(resCompleted)
    }

    return fetchData();
  })

  return (
    <div>
      <nav>
        <Button variant="contained">cerrar sesión</Button>
      </nav>
      <main>Dashboard</main>
    </div>
  );
}
