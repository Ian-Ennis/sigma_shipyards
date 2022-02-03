import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import part from ".//Images/part.png";

function Shipyard({ selectedSystem }) {
  const [viewport, setViewport] = useState(false);
  const [chosenShip, setChosenShip] = useState([]);
  const [engineParts, setEngineParts] = useState([]);
  const [hullParts, setHullParts] = useState([]);
  const [credits, setCredits] = useState(1000000);
  const [hullStrength, setHullStrength] = useState(0);
  const [shipRange, setShipRange] = useState(0);
  const navigate = useNavigate();

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
      })
      .then(
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
          })
          .then(
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
              })
          )
      );
  }

  function navigateToMenu() {
    navigate("/main_menu");
  }

  function navigateToDebrief() {
    navigate("/MissionDebrief");
  }

  function epart1Clicked(e) {
    e.preventDefault();
    if (credits - engineParts[0].cost >= 0) {
      setCredits(credits - engineParts[0].cost);
      setShipRange(shipRange + engineParts[0].range);
    } else {
      console.log("can't afford");
    }
  }

  function epart2Clicked(e) {
    e.preventDefault();
    if (credits - engineParts[1].cost >= 0) {
      setCredits(credits - engineParts[1].cost);
      setShipRange(shipRange + engineParts[1].range);
    } else {
      console.log("can't afford");
    }
  }

  function epart3Clicked(e) {
    e.preventDefault();
    if (credits - engineParts[2].cost >= 0) {
      setCredits(credits - engineParts[2].cost);
      setShipRange(shipRange + engineParts[2].range);
    } else {
      console.log("can't afford");
    }
  }

  function hpart1Clicked(e) {
    e.preventDefault();
    if (credits - hullParts[0].cost >= 0) {
      setCredits(credits - hullParts[0].cost);
      setHullStrength(hullStrength + hullParts[0].hull_strength);
    } else {
      console.log("can't afford");
    }
  }

  function hpart2Clicked(e) {
    e.preventDefault();
    if (credits - hullParts[1].cost >= 0) {
      setCredits(credits - hullParts[1].cost);
      setHullStrength(hullStrength + hullParts[1].hull_strength);
    } else {
      console.log("can't afford");
    }
  }

  function hpart3Clicked(e) {
    e.preventDefault();
    if (credits - hullParts[2].cost >= 0) {
      setCredits(credits - hullParts[2].cost);
      setHullStrength(hullStrength + hullParts[2].hull_strength);
    } else {
      console.log("can't afford");
    }
  }

  return (
    <>
      {viewport ? (
        <div className="shipyard">
          <div className="stats_parts_container">
            <div className="statistics">
              <h3>Destination</h3>
              <p>System: {selectedSystem.name}</p>
              <p>Distance: {selectedSystem.distance} light years</p>
              <h3>Budget</h3>
              <p>Credits: {credits}</p>
              <h3>{chosenShip[0].name} Statistics</h3>
              <p>Hull strength: {hullStrength}%</p>
              <p>Fuel tank range: {shipRange} light years</p>
            </div>
            <div className="your_spaceship">{chosenShip[0].name}</div>
            <div className="parts">
              <h3>Available Parts</h3>
              <h4>Engine:</h4>
              <div className="engine_parts">
                <div id="epart1" onClick={epart1Clicked}>
                  <img className="part" src={part} alt="part" />
                  <p>{engineParts[0].part_name}</p>
                  <p>{engineParts[0].range} ly</p>
                  <p>{engineParts[0].cost} c</p>
                </div>
                <div id="epart2" onClick={epart2Clicked}>
                  <img className="part" src={part} alt="part" />
                  <p>{engineParts[1].part_name}</p>
                  <p>{engineParts[1].range} ly</p>
                  <p>{engineParts[1].cost} c</p>
                </div>
                <div id="epart3" onClick={epart3Clicked}>
                  <img className="part" src={part} alt="part" />
                  <p>{engineParts[2].part_name}</p>
                  <p>{engineParts[2].range} ly</p>
                  <p>{engineParts[2].cost} c</p>
                </div>
              </div>
              <h4>Hull:</h4>
              <div className="hull_parts">
                <div id="hpart1" onClick={hpart1Clicked}>
                  <img className="part" src={part} alt="part" />
                  <p>{hullParts[0].part_name}</p>
                  <p>+{hullParts[0].hull_strength}%</p>
                  <p>{hullParts[0].cost} c</p>
                </div>
                <div id="hpart2" onClick={hpart2Clicked}>
                  <img className="part" src={part} alt="part" />
                  <p>{hullParts[1].part_name}</p>
                  <p>+{hullParts[1].hull_strength}%</p>
                  <p>{hullParts[1].cost} c</p>
                </div>
                <div id="hpart3" onClick={hpart3Clicked}>
                  <img className="part" src={part} alt="part" />
                  <p>{hullParts[2].part_name}</p>
                  <p>+{hullParts[2].hull_strength}%</p>
                  <p>{hullParts[2].cost} c</p>
                </div>
              </div>
            </div>
          </div>
          <button onClick={navigateToMenu}>Main Menu</button>
          <button onClick={navigateToDebrief}>Mission Debrief</button>
          <button
            id="decline_logout"
            onClick={() => {
              localStorage.setItem("jwt", "");
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div id="intro_to_shipyard">
          <p id="approach_terminal">
            Thoughts of self-doubt, but intrigue over what lies ahead...
            Yet somehow, you sense a fleeting glimmer of confidence in your ship-making
            abilities, as you step forth to the shipyard computer terminal...
          </p>
          <button onClick={getShip}>Name your ship</button>
        </div>
      )}
    </>
  );
}

export default Shipyard;
