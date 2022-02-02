import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import MainMenu from "./MainMenu";
import MissionDebrief from "./MissionDebrief";
import Shipyard from "./Shipyard"

function App() {
  const [selectedSystem, setSelectedSystem] = useState([]);

  
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main_menu" element={<MainMenu />} />
        <Route path="/MissionDebrief" element={<MissionDebrief setSelectedSystem={setSelectedSystem} />} />
        <Route path="/Shipyard" element={<Shipyard selectedSystem={selectedSystem} />} />
      </Routes>
    </div>
  );
}

export default App;
