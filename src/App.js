import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import MainMenu from "./MainMenu";
import MissionSelect from "./MissionSelect";
import ShipsOverview from "./ShipsOverview";
import SigmaShipyard from "./SigmaShipyard"


function App() {
  const [selectedSystem, setSelectedSystem] = useState([]);
  const [chosenShip, setChosenShip] = useState({});

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main_menu" element={<MainMenu />} />
        <Route path="/misson_select" element={<MissionSelect setSelectedSystem={setSelectedSystem} />} />
        <Route path="/ships_overview" element={<ShipsOverview selectedSystem={selectedSystem} setSelectedSystem={setSelectedSystem} setChosenShip={setChosenShip}/>} />
        <Route path="/sigma_shipyard" element={<SigmaShipyard selectedSystem={selectedSystem} chosenShip={chosenShip}/>} setChosenShip={setChosenShip} />
      </Routes>
    </div>
  );
}

export default App;
