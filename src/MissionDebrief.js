import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MissionDebrief({ setSelectedSystem }) {
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
        setTriSystems(data);
        setIsDebriefed(true);
      });
  }

  function selectProxima(e) {
    e.preventDefault();
    setSelectedSystem(triSystems[0]);
    navigate("/Shipyard");
  }

  function selectTau(e) {
    e.preventDefault();
    setSelectedSystem(triSystems[1]);
    navigate("/Shipyard");
  }

  function selectUpsilon(e) {
    e.preventDefault();
    setSelectedSystem(triSystems[2]);
    navigate("/Shipyard");
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
          <h2 id="mission_select">Choose your misson..</h2>
          <div className="misson_container">
            <div id="proxima">
              <p>System: <b><em>{triSystems[0].name}</em></b></p>
              <p>Distance: <b>{triSystems[0].distance} light years</b></p>
              <p>Mission complexity: <b>{triSystems[0].mission_complexity}</b></p>
              <p>
                Chance of finding habitable planet:{" "}
                <b>{triSystems[0].habitibility_chance}%</b>
              </p>
              <button onClick={selectProxima}>Choose system</button>
            </div>
            <div id="tau">
              <p>System: <b><em>{triSystems[1].name}</em></b></p>
              <p>Distance: <b>{triSystems[1].distance} light years</b></p>
              <p>Mission complexity: <b>{triSystems[1].mission_complexity}</b></p>
              <p>
                Chance of finding habitable planet:{" "}
                <b>{triSystems[1].habitibility_chance}%</b>
              </p>
              <button onClick={selectTau}>Choose system</button>
            </div>
            <div id="upsilon">
              <p>System: <b><em>{triSystems[2].name}</em></b></p>
              <p>Distance: <b>{triSystems[2].distance} light years</b></p>
              <p>Mission complexity: <b>{triSystems[2].mission_complexity}</b></p>
              <p>
                Chance of finding habitable planet:{" "}
                <b>{triSystems[2].habitibility_chance}%</b>
              </p>
              <button onClick={selectUpsilon}>Choose system</button>
            </div>
          </div>
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
        getSystems()
      )}
    </div>
  );
}

export default MissionDebrief;
