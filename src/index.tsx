import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Home } from "./react/pages/home";
import MatchScoutingForm from "./react/pages/matchScoutingForm";
import ScoutingCompiler from "./react/pages/compiler";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate replace to="/home" />} />
        <Route path="/index" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/match-scouting" element={<MatchScoutingForm/>} />
        <Route path="/scouting-compiler" element={<ScoutingCompiler/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
