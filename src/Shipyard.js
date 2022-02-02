import React from "react";
import { useNavigate } from "react-router-dom";

function Shipyard({ selectedSystem }) {
  const navigate = useNavigate();
  const credits = 1000000

  function navigateToMenu() {
    navigate("/main_menu");
  }

  function navigateToDebrief() {
    navigate("/MissionDebrief");
  }

  return (
    <div>
      <div className="stats_parts_container">
        <div className="statistics">
          <h3>Destination</h3>
          <p>System: {selectedSystem.name}</p>
          <p>Distance: {selectedSystem.distance} light years</p>
          <h3>Budget</h3>
          <p>Credits: </p>
          <h3>Ship Statistics</h3>
          <p>Hull strength:</p>
          <p>Range of Spaceship:</p>
        </div>
        <div className="your_spaceship">Spaceship goes here</div>
        <div className="parts">
          <h3>Available Parts</h3>
        </div>
      </div>
      <button onClick={navigateToMenu}>Main Menu</button>
      <button onClick={navigateToDebrief}>Mission Debrief</button>
    </div>
  );
}

export default Shipyard;
