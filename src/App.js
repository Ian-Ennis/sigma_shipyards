import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import MainMenu from "./MainMenu";
import Sigma_Shipyard from "./Sigma_Shipyard";

function App() {
  const title = <h1>Sigma Shipyards</h1>;

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main_menu" element={<MainMenu />} />
        <Route path="/Sigma_Shipyard" element={<Sigma_Shipyard />} />
      </Routes>
    </div>
  );
}

export default App;
