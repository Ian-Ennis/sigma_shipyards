import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Shipyard({ selectedSystem }) {
  const [viewport, setViewport] = useState(false);
  const [chosenShip, setChosenShip] = useState([]);
  const navigate = useNavigate();

  const credits = 1000000;
  const hullStrength = 0
  const range = 0


  function getShip() {
    fetch(`http://localhost:3000/spaceships`, {
      method: "GET",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setChosenShip(data);
        setViewport(true)
      });
  }

  function navigateToMenu() {
    navigate("/main_menu");
  }

  function navigateToDebrief() {
    navigate("/MissionDebrief");
  }

  return (
    <div>
      {viewport ? (
        <div>
          <div className="stats_parts_container">
            <div className="statistics">
              <h3>Destination</h3>
              <p>System: {selectedSystem.name}</p>
              <p>Distance: {selectedSystem.distance} light years</p>
              <h3>Budget</h3>
              <p>Credits: {credits}</p>
              <h3>{chosenShip[0].name} Statistics</h3>
              <p>Hull strength: {hullStrength}%</p>
              <p>Fuel tank: {range} light years</p>
            </div>
            <div className="your_spaceship">{chosenShip[0].name}</div>
            <div className="parts">
              <h3>Available Parts</h3>
            </div>
          </div>
          <button onClick={navigateToMenu}>Main Menu</button>
          <button onClick={navigateToDebrief}>Mission Debrief</button>
        </div>
      ) : (
        <div>
          <button onClick={getShip}>Approach engineering terminal</button>
        </div>
      )}
    </div>
  );
}

export default Shipyard;
