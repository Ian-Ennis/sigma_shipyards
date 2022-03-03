import React from 'react';
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import MainMenu from "./MainMenu";
import MissionSelect from "./features/systems/MissionSelect";
import ShipsOverview from "./features/ships/ShipsOverview";
import SigmaShipyard from "./features/ships/SigmaShipyard"
import ChromeDinoGame from 'react-chrome-dino';
import "./App.css";


function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main_menu" element={<MainMenu />} />
        <Route path="/misson_select" element={<MissionSelect />} />
        <Route path="/ships_overview" element={<ShipsOverview />} />
        <Route path="/sigma_shipyard" element={<SigmaShipyard />} />
        <Route path="/game" element={<ChromeDinoGame />} />        
      </Routes>
    </div>
  );
}

export default App;
