import React from "react";
import { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

function Sigma_Shipyard() {
  const [isDebriefed, setIsDebriefed] = useState(false);
  const [triSystems, setTriSystems] = useState([]);
//   const [readableSystems, setReadableSystems] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState([]);
  const navigate = useNavigate();

  function getSystems(e) {
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
        // setReadableSystems([
        //   { value: triSystems[0].name, label: triSystems[0].name },
        //   { value: triSystems[1].name, label: triSystems[1].name },
        //   { value: triSystems[2].name, label: triSystems[2].name },
        // ]);
        setIsDebriefed(true);
      });
  }

  function selectProxima(e) {
    setSelectedSystem(triSystems[0]);
  }

  function selectTauCeti(e) {
    setSelectedSystem(triSystems[1]);
  }

  function selectUpsilon(e) {
    setSelectedSystem(triSystems[2]);
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
          <div id="card_1">
            <h3>System: {triSystems[0].name}</h3>
            <h3>Distance: {triSystems[0].distance} light years</h3>
            <h3>Mission complexity: {triSystems[0].mission_complexity}</h3>
            <h3>
              Chance of finding habitable planet:{" "}
              {triSystems[0].habitibility_chance}%
            </h3>
            <button onClick={selectProxima}>Choose system</button>
          </div>
          <div id="card_2">
            <h3>System: {triSystems[1].name}</h3>
            <h3>Distance: {triSystems[1].distance} light years</h3>
            <h3>Mission complexity: {triSystems[1].mission_complexity}</h3>
            <h3>
              Chance of finding habitable planet:{" "}
              {triSystems[1].habitibility_chance}%
            </h3>
            <button onClick={selectTauCeti}>Choose system</button>

          </div>
          <div id="card_3">
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
      ) : (
        getSystems()
      )}
    </div>
  );
}

export default Sigma_Shipyard;

{
  /* <Select
            className="system_dropdown"
            placeholder="Select star system"
            options={readableSystems}
            onChange={selectSystem}
          /> */
}

{
  /* <button onClick={getSystems}>getSystems</button>
<button onClick={navigateToLogin}>Back to Login</button>
<button onClick={navigateToMainMenu}>Back to Main Menu</button> */
}

/* <div>
            <h1>{selectedSystem}</h1>
            <h2>Distance from earth: 11.9 light years </h2>
            <h2>Voyage complexity: Low</h2>
            <h2>Probability of locating habitable planet: 35%</h2>
          </div>
           */

/* <div>
          <div className="ship_statistics"></div>

          <div className="parts"></div>

          <button onClick={navigateToLogin}>Back to Login</button>
          <button onClick={navigateToMainMenu}>Back to Main Menu</button>
        </div> */
