import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Shipyard({ selectedSystem }) {
  const [viewport, setViewport] = useState(false);
  const [chosenShip, setChosenShip] = useState([]);
  const [engineParts, setEngineParts] = useState([]);
  const [hullParts, setHullParts] = useState([]);
  const navigate = useNavigate();

  const credits = 1000000;
  const hullStrength = 0;
  const range = 0;

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
    });
    
    fetch(`http://localhost:3000/engine_parts`, {
        method: "GET",
        headers: {
            Accepts: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
    })
    .then((res) => res.json())
    .then((data) => {
        setEngineParts(data);
    });
    
    fetch(`http://localhost:3000/hull_parts`, {
        method: "GET",
        headers: {
            Accepts: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
    })
    .then((res) => res.json())
    .then((data) => {
        setHullParts(data);
        setViewport(true);
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
                <h4>Engine:</h4>
              <div className="engine_parts">
                <div id="epart1">
                  <p>{engineParts[0].part_name}</p>
                  <p>{engineParts[0].tank_size}</p>
                  <p>{engineParts[0].cost}</p>
                </div>
                <div id="epart2">
                  <p>{engineParts[1].part_name}</p>
                  <p>{engineParts[1].tank_size}</p>
                  <p>{engineParts[1].cost}</p>
                </div>
                <div id="epart3">
                  <p>{engineParts[2].part_name}</p>
                  <p>{engineParts[2].tank_size}</p>
                  <p>{engineParts[2].cost}</p>
                </div>
              </div>
                <h4>Hull:</h4>
              <div className="hull_parts">
                <div id="hpart1">
                  <p>{hullParts[0].part_name}</p>
                  <p>{hullParts[0].hull_strength}</p>
                  <p>{hullParts[0].cost}</p>
                </div>
                <div id="hpart2">
                  <p>{hullParts[1].part_name}</p>
                  <p>{hullParts[1].hull_strength}</p>
                  <p>{hullParts[1].cost}</p>
                </div>
                <div id="hpart3">
                  <p>{hullParts[2].part_name}</p>
                  <p>{hullParts[2].hull_strength}</p>
                  <p>{hullParts[2].cost}</p>
                </div>
              </div>
            </div>
          </div>
          <button onClick={navigateToMenu}>Main Menu</button>
          <button onClick={navigateToDebrief}>Mission Debrief</button>
        </div>
      ) : (
        <div>
          <button onClick={getShip}>Approach shipyard computer terminal</button>
        </div>
      )}
    </div>
  );
}

export default Shipyard;
