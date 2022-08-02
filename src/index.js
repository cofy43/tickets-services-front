import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./index.css";

/** View */
import App from './App';
import Dashboard from './routes/dashboard';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />      
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
);