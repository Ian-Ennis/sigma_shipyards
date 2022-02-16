import React from 'react';
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import MainMenu from "./MainMenu";
import SystemsSelect from "./features/systems/SystemsSelect";
import ShipsOverview from "./features/ships/ShipsOverview";
import SigmaShipyard from "./features/ships/SigmaShipyard"
import "./App.css";


function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main_menu" element={<MainMenu />} />
        <Route path="/misson_select" element={<SystemsSelect />} />
        <Route path="/ships_overview" element={<ShipsOverview />} />
        <Route path="/sigma_shipyard" element={<SigmaShipyard />} />
      </Routes>
    </div>
  );
}

export default App;
