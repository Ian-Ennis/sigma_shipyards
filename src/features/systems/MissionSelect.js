import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import proxima_centauri from "../../Images/proxima_centauri.jpeg";
import tau_ceti from "../../Images/tau_ceti.jpeg";
import upsilon_andromedae from "../../Images/upsilon_andromedae.jpeg";

function MissionSelect({ setSelectedSystem }) {
    const [triSystems, setTriSystems] = useState([])
    const [isDebriefed, setIsDebriefed] = useState(false);
  
    const navigate = useNavigate();
    // let triSystems = [];
  
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
          console.log(triSystems)
          setTriSystems(data);
          setIsDebriefed(true)
        })
      }
  
  
    function selectProxima(e, system) {
      e.preventDefault();
      setSelectedSystem(system);
      navigate("/ships_overview");
    }
  
    function selectTau(e, system) {
      e.preventDefault();
      setSelectedSystem(system);
      navigate("/ships_overview");
    }
  
    function selectUpsilon(e, system) {
      e.preventDefault();
      setSelectedSystem(system);
      navigate("/ships_overview");
    }
  
    function goBack() {
      navigate("/main_menu");
    }
  
    return (
      <>
      {isDebriefed ? 
          <div className="misson_div">
            <h2 id="mission_select">Choose your destination:</h2>
            <div className="misson_container">
              <div id="proxima">
                <p>
                  System:{" "}
                  <b>
                    <em>{triSystems[0].name}</em>
                  </b>
                </p>
                <img className="img_proxima" src={proxima_centauri} alt="proxima_centauri" />
                <p>
                  Distance: <b>{triSystems[0].distance} light years</b>
                </p>
                <p>
                  Mission complexity: <b>{triSystems[0].mission_complexity}</b>
                </p>
                <p>
                  Chance of finding habitable planet:{" "}
                  <b>{triSystems[0].habitibility_chance}%</b>
                </p>
                <button onClick={(e) => selectProxima(e, triSystems[0])}>Choose system</button>
              </div>
              <div id="tau">
                <p>
                  System:{" "}
                  <b>
                    <em>{triSystems[1].name}</em>
                  </b>
                </p>
                <img className="img_tau_ceti" src={tau_ceti} alt="tau_ceti" />
                <p>
                  Distance: <b>{triSystems[1].distance} light years</b>
                </p>
                <p>
                  Mission complexity: <b>{triSystems[1].mission_complexity}</b>
                </p>
                <p>
                  Chance of finding habitable planet:{" "}
                  <b>{triSystems[1].habitibility_chance}%</b>
                </p>
                <button onClick={(e) => selectTau(e, triSystems[1])}>Choose system</button>
              </div>
              <div id="upsilon">
                <p>
                  System:{" "}
                  <b>
                    <em>{triSystems[2].name}</em>
                  </b>
                </p>
                <img className="img_upsilon" src={upsilon_andromedae} alt="upsilon_andromedae" />
                <p>
                  Distance: <b>{triSystems[2].distance} light years</b>
                </p>
                <p>
                  Mission complexity: <b>{triSystems[2].mission_complexity}</b>
                </p>
                <p>
                  Chance of finding habitable planet:{" "}
                  <b>{triSystems[2].habitibility_chance}%</b>
                </p>
                <button onClick={(e) => selectUpsilon(e, triSystems[2])}>Choose system</button>
              </div>
            </div>
            <button onClick={goBack}>Go back</button>
            <div id="logout">
              <button
                onClick={() => {
                  localStorage.setItem("jwt", "");
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          </div> : getSystems()
    }
      </>
    );
  }
  
  export default MissionSelect;
  