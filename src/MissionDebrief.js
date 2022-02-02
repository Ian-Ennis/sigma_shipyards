import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MissionDebrief({setSelectedSystem}) {
  const [isDebriefed, setIsDebriefed] = useState(false);
  const [triSystems, setTriSystems] = useState([]);

  const navigate = useNavigate();


  function getSystems() {
    fetch(`http://localhost:3000/star_systems`, {
      method: "GET",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0]);
        setTriSystems(data);
        setIsDebriefed(true);
      });
  }

  function selectProxima(e) {
    e.preventDefault();
    setSelectedSystem(triSystems[0]);
    navigate("/Shipyard")
  }

  function selectTau(e) {
    e.preventDefault();
    setSelectedSystem(triSystems[1]);
    navigate("/Shipyard")
  }

  function selectUpsilon(e) {
    e.preventDefault();
    setSelectedSystem(triSystems[2]);
    navigate("/Shipyard")
  }

  function navigateToLogin() {
    navigate("/");
  }

  function navigateToMainMenu() {
    navigate("/main_menu");
  }

  return (
    <div>
      {isDebriefed ? (
        <div>
          <div id="proxima">
            <h3>System: {triSystems[0].name}</h3>
            <h3>Distance: {triSystems[0].distance} light years</h3>
            <h3>Mission complexity: {triSystems[0].mission_complexity}</h3>
            <h3>
              Chance of finding habitable planet:{" "}
              {triSystems[0].habitibility_chance}%
            </h3>
            <button onClick={selectProxima}>Choose system</button>
          </div>
          <div id="tau">
            <h3>System: {triSystems[1].name}</h3>
            <h3>Distance: {triSystems[1].distance} light years</h3>
            <h3>Mission complexity: {triSystems[1].mission_complexity}</h3>
            <h3>
              Chance of finding habitable planet:{" "}
              {triSystems[1].habitibility_chance}%
            </h3>
            <button onClick={selectTau}>Choose system</button>
          </div>
          <div id="upsilon">
            <h3>System: {triSystems[2].name}</h3>
            <h3>Distance: {triSystems[2].distance} light years</h3>
            <h3>Mission complexity: {triSystems[2].mission_complexity}</h3>
            <h3>
              Chance of finding habitable planet:{" "}
              {triSystems[2].habitibility_chance}%
            </h3>
            <button onClick={selectUpsilon}>Choose system</button>
          </div>
        </div>
      )  : (
        getSystems()
      )}
    </div>
  );
}

export default MissionDebrief;
