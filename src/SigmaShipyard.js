import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import nuclear_reactor from ".//Images/nuclear_reactor.png";
import fusion_reactor from ".//Images/fusion_reactor.jpeg";
import antimatter_drive from ".//Images/antimatter_drive.jpeg";
import carbon_fiber from ".//Images/carbon_fiber.jpeg";
import graphene_weave from ".//Images/graphene_weave.jpeg";
import neutrino_repulsor from ".//Images/neutrino_repulsor.png";
import proxima_centauri from ".//Images/proxima_centauri.jpeg";
import tau_ceti from ".//Images/tau_ceti.jpeg";
import upsilon_andromedae from ".//Images/upsilon_andromedae.jpeg";


function SigmaShipyard({ selectedSystem, chosenShip, setChosenShip }) {
  const [viewport, setViewport] = useState(false);
  const [engineParts, setEngineParts] = useState([]);
  const [hullParts, setHullParts] = useState([]);
  const [credits, setCredits] = useState(1000000);
  const [hullStrength, setHullStrength] = useState(0);
  const [shipRange, setShipRange] = useState(0);

  const navigate = useNavigate();

  let sysImg = "";
  if (selectedSystem.name === "Proxima Centauri") {
    sysImg = proxima_centauri;
  } else if (selectedSystem.name === "Tau Ceti") {
    sysImg = tau_ceti;
  } else {
    sysImg = upsilon_andromedae;
  }

  function loadParts() {
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
      .then(() => {
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
            setViewport(true)
          })
        });
  }

  var nuclearReactors = 0;
  let fusionReactors = 0;
  let antimatterDrives = 0;

  let carbonFiber = 0;
  let grapheneMatrix = 0;
  let neutrinoRepulsions = 0;

  function buyEPart1(e) {
    e.preventDefault();
    if (credits - engineParts[0].cost >= 0) {
      console.log(nuclearReactors)
      nuclearReactors += 1;
      console.log(nuclearReactors)
      setCredits(credits - engineParts[0].cost);
      setShipRange(shipRange + engineParts[0].range);
    } else {
      window.confirm("You have run out of credits. Sell parts to increase your budget.");
    }
  }

  function sellEPart1(e) {
    e.preventDefault();
    console.log(nuclearReactors)
    // if (nuclearReactors > 0) {
    //   setCredits(credits + engineParts[0].cost);
    //   setShipRange(shipRange - engineParts[0].range);
    // } else {
    //   window.confirm("You have no more to sell.");
    // }
  }

  function buyEPart2(e) {
    e.preventDefault();
    if (credits - engineParts[1].cost >= 0) {
      setCredits(credits - engineParts[1].cost);
      setShipRange(shipRange + engineParts[1].range);
    } else {
      window.confirm("You have run out of credits. Sell parts to increase your budget.");
    }
  }

  function buyEPart3(e) {
    e.preventDefault();
    if (credits - engineParts[2].cost >= 0) {
      setCredits(credits - engineParts[2].cost);
      setShipRange(shipRange + engineParts[2].range);
    } else {
      window.confirm("You have run out of credits. Sell parts to increase your budget.");
    }
  }

  function buyHPart1(e) {
    e.preventDefault();
    if (credits - hullParts[0].cost >= 0) {
      setCredits(credits - hullParts[0].cost);
      setHullStrength(hullStrength + hullParts[0].hull_strength);
    } else {
      window.confirm("You have run out of credits. Sell parts to increase your budget.");
    }
  }

  function buyHPart2(e) {
    e.preventDefault();
    if (credits - hullParts[1].cost >= 0) {
      setCredits(credits - hullParts[1].cost);
      setHullStrength(hullStrength + hullParts[1].hull_strength);
    } else {
      window.confirm("You have run out of credits. Sell parts to increase your budget.");
    }
  }

  function buyHPart3(e) {
    e.preventDefault();
    if (credits - hullParts[2].cost >= 0) {
      setCredits(credits - hullParts[2].cost);
      setHullStrength(hullStrength + hullParts[2].hull_strength);
    } else {
      console.log("can't afford");
    }
  }

  function scrapShip() {
    console.log(chosenShip)

    window.confirm(`Delete ${chosenShip.spaceship_name} from database?`)
    if (window.confirm) {
    fetch(`http://localhost:3000/spaceships/${chosenShip.id}`, {
      method: "DELETE"
      })
      .then(res=> {
        if (res.ok) {
          console.log(res)
        } else {
          res.json().then(console.log)
        }
      })
      navigate("/ships_overview")
    }
  }

  function goBack() {
    navigate("/ships_overview")
  }

  return (
    <div>
      {viewport ? (
        <div className="shipyard">
          <div className="stats_parts_container">
            <div className="statistics">
              <h3>Destination</h3>
              <p>System: {selectedSystem.name}</p>
              <p>Distance: {selectedSystem.distance} light years</p>
              <p>Mission complexity: {selectedSystem.mission_complexity}</p>
              <div id="shipyard_mission">
                <img id="shipyard_misson_img" src={sysImg} alt="selected_system" />
              </div>
              <h3>Budget</h3>
              <p>Credits: {credits}</p>
              <h3><em>{chosenShip.spaceship_name}</em> Statistics</h3>
              <p>Fuel tank range: {shipRange} light years</p>
              <p>Hull strength: {hullStrength}%</p>
            </div>
            <div className="your_spaceship">
              <em>{chosenShip.spaceship_name}</em>
            </div>
            <div className="parts">
              <h3>Available Parts</h3>
              <h4>Engine:</h4>
              <div className="engine_parts">
                <div id="epart1">
                  <img
                    className="part"
                    src={nuclear_reactor}
                    alt="nuclear_reactor"
                  />
                  <p>{engineParts[0].part_name}</p>
                  <p>{engineParts[0].range} ly</p>
                  <p>{engineParts[0].cost} c</p>
                  <button onClick={buyEPart1}>Buy</button>
                  <button onClick={sellEPart1}>Sell</button>

                </div>
                <div id="epart2">
                  <img
                    className="part"
                    src={fusion_reactor}
                    alt="fusion_reactor"
                  />
                  <p>{engineParts[1].part_name}</p>
                  <p>{engineParts[1].range} ly</p>
                  <p>{engineParts[1].cost} c</p>
                  <button onClick={buyEPart2}>Buy</button>
                </div>
                <div id="epart3">
                  <img
                    className="part"
                    src={antimatter_drive}
                    alt="antimatter_drive"
                  />
                  <p>{engineParts[2].part_name}</p>
                  <p>{engineParts[2].range} ly</p>
                  <p>{engineParts[2].cost} c</p>
                  <button onClick={buyEPart3}>Buy</button>
                </div>
              </div>
              <h4>Hull:</h4>
              <div className="hull_parts">
                <div id="hpart1">
                  <img className="part" src={carbon_fiber} alt="part" />
                  <p>{hullParts[0].part_name}</p>
                  <p>+{hullParts[0].hull_strength}%</p>
                  <p>{hullParts[0].cost} c</p>
                  <button onClick={buyHPart1}>Buy</button>
                </div>
                <div id="hpart2">
                  <img className="part" src={graphene_weave} alt="part" />
                  <p>{hullParts[1].part_name}</p>
                  <p>+{hullParts[1].hull_strength}%</p>
                  <p>{hullParts[1].cost} c</p>
                  <button onClick={buyHPart2}>Buy</button>
                </div>
                <div id="hpart3">
                  <img className="part" src={neutrino_repulsor} alt="part" />
                  <p>{hullParts[2].part_name}</p>
                  <p>+{hullParts[2].hull_strength}%</p>
                  <p>{hullParts[2].cost} c</p>
                  <button onClick={buyHPart3}>Buy</button>
                </div>
              </div>
            </div>
          </div>
          <button onClick={scrapShip}>Scrap ship</button>
          <button onClick={goBack}>Go back</button>
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
        loadParts()
      )}
    </div>
  );
}

export default SigmaShipyard;
