import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  buyNuclear,
  sellNuclear,
  buyFusion,
  sellFusion,
  buyAntimatter,
  sellAntimatter,
  buyCarbon,
  sellCarbon,
  buyGraphene,
  sellGraphene,
  buyNeutrino,
  sellNeutrino,
} from "./CreditsSlice";
import {
  installNuclear,
  removeNuclear,
  installFusion,
  removeFusion,
  installAntimatter,
  removeAntimatter,
} from "./RangeSlice";
import {
  installCarbon,
  removeCarbon,
  installGraphene,
  removeGraphene,
  installNeutrino,
  removeNeutrino,
} from "./StrengthSlice";
import { useDispatch } from "react-redux";
import nuclear_reactor from "../../Images/nuclear_reactor.png";
import fusion_reactor from "../../Images/fusion_reactor.jpeg";
import antimatter_drive from "../../Images/antimatter_drive.jpeg";
import carbon_fiber from "../../Images/carbon_fiber.jpeg";
import graphene_weave from "../../Images/graphene_weave.jpeg";
import neutrino_repulsor from "../../Images/neutrino_repulsor.png";
import proxima_centauri from "../../Images/proxima_centauri.jpeg";
import tau_ceti from "../../Images/tau_ceti.jpeg";
import upsilon_andromedae from "../../Images/upsilon_andromedae.jpeg";
import { store } from "../../app/store";

function SigmaShipyard({ selectedSystem, chosenShip, setChosenShip }) {
  const [viewport, setViewport] = useState(false);
  const [engineParts, setEngineParts] = useState([]);
  const [hullParts, setHullParts] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const storeState = useSelector((state) => state);
  console.log(storeState);

  const spaceship_name = chosenShip.spaceship_name;
  const credits = storeState.credits.balance;
  const range = storeState.range.distance;
  const nuclearCount = storeState.range.nuclearCount;
  const fusionCount = storeState.range.fusionCount;
  const antimatterCount = storeState.range.antimatterCount;
  const strength = storeState.strength.hull;
  const carbonCount = storeState.strength.carbonCount;
  const grapheneCount = storeState.strength.grapheneCount;
  const neutrinoCount = storeState.strength.neutrinoCount;

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
            setViewport(true);
          });
      });
  }

  function buyEPart1(e) {
    e.preventDefault();
    if (credits >= 150000) {
      dispatch(buyNuclear());
      dispatch(installNuclear());
      console.log(credits, nuclearCount, range);
    } else {
      window.confirm("You have run out of credits.");
    }
  }

  function sellEPart1(e) {
    e.preventDefault();
    if (nuclearCount > 0) {
      dispatch(sellNuclear());
      dispatch(removeNuclear());
      console.log(credits, nuclearCount, range);
    } else {
      window.confirm("You have no more to sell.");
    }
  }

  function buyEPart2(e) {
    e.preventDefault();
    if (credits >= 250000) {
      dispatch(buyFusion());
      dispatch(installFusion());
      console.log(credits, fusionCount, range);
    } else {
      window.confirm("You have run out of credits.");
    }
  }

  function sellEPart2(e) {
    e.preventDefault();
    if (fusionCount > 0) {
      dispatch(sellFusion());
      dispatch(removeFusion());
      console.log(credits, fusionCount, range);
    } else {
      window.confirm("You have no more to sell.");
    }
  }

  function buyEPart3(e) {
    e.preventDefault();
    if (credits >= 400000) {
      dispatch(buyAntimatter());
      dispatch(installAntimatter());
      console.log(credits, antimatterCount, range);
    } else {
      window.confirm("You have run out of credits.");
    }
  }

  function sellEPart3(e) {
    e.preventDefault();
    if (antimatterCount > 0) {
      dispatch(sellAntimatter());
      dispatch(removeAntimatter());
      console.log(credits, antimatterCount, range);
    } else {
      window.confirm("You have no more to sell.");
    }
  }

  function buyHPart1(e) {
    e.preventDefault();
    if (credits >= 20000) {
      dispatch(buyCarbon());
      dispatch(installCarbon());
      console.log(credits, carbonCount, range);
    } else {
      window.confirm("You have run out of credits.");
    }
  }

  function sellHPart1(e) {
    e.preventDefault();
    if (carbonCount > 0) {
      dispatch(sellCarbon());
      dispatch(removeCarbon());
      console.log(credits, carbonCount, range);
    } else {
      window.confirm("You have no more to sell.");
    }
  }

  function buyHPart2(e) {
    e.preventDefault();
    if (credits >= 90000) {
      dispatch(buyGraphene());
      dispatch(installGraphene());
      console.log(credits, grapheneCount, range);
    } else {
      window.confirm("You have run out of credits.");
    }
  }

  function sellHPart2(e) {
    e.preventDefault();
    if (grapheneCount > 0) {
      dispatch(sellGraphene());
      dispatch(removeGraphene());
      console.log(credits, grapheneCount, range);
    } else {
      window.confirm("You have no more to sell.");
    }
  }

  function buyHPart3(e) {
    e.preventDefault();
    if (credits >= 300000) {
      dispatch(buyNeutrino());
      dispatch(installNeutrino());
      console.log(credits, neutrinoCount, range);
    } else {
      console.log("You have run out of credits.");
    }
  }

  function sellHPart3(e) {
    e.preventDefault();
    if (neutrinoCount > 0) {
      dispatch(sellNeutrino());
      dispatch(removeNeutrino());
      console.log(credits, neutrinoCount, range);
    } else {
      window.confirm("You have no more to sell.");
    }
  }

  function saveShip() {
    console.log(chosenShip);

    fetch(`http://localhost:3000/spaceships/${chosenShip.id}`, {
      method: "PATCH",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        spaceship_name,
        credits,
        range,
        strength,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  function scrapShip() {
    console.log(chosenShip);

    window.confirm(`Delete ${chosenShip.spaceship_name} from database?`);
    if (window.confirm) {
      fetch(`http://localhost:3000/spaceships/${chosenShip.id}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          console.log(res);
        } else {
          res.json().then(console.log);
        }
      });
      navigate("/ships_overview");
    }
  }

  function goBack() {
    navigate("/ships_overview");
  }

  return (
    <>
      {viewport ? (
        <div className="whole_shipyard">
          <div className="shipyard">
            <div className="stats_parts_container">
              <h3>Available Parts</h3>
              <div className="parts">
                <div id="engine_parts_container">
                  <h4>Propulsion:</h4>
                  <div className="engine_parts">
                    <div id="epart1">
                      <div id="nuclear_div"></div>
                      <p>{engineParts[0].part_name}</p>
                      <p>{engineParts[0].range} ly</p>
                      <p>{engineParts[0].cost} c</p>
                      <button onClick={buyEPart1}>Buy</button>
                      <button onClick={sellEPart1}>Sell</button>
                    </div>
                    <div id="epart2">
                      <div id="fusion_div"></div>
                      <p>{engineParts[1].part_name}</p>
                      <p>{engineParts[1].range} ly</p>
                      <p>{engineParts[1].cost} c</p>
                      <button onClick={buyEPart2}>Buy</button>
                      <button onClick={sellEPart2}>Sell</button>
                    </div>
                    <div id="epart3">
                      <div id="antimatter_div"></div>
                      <p>{engineParts[2].part_name}</p>
                      <p>{engineParts[2].range} ly</p>
                      <p>{engineParts[2].cost} c</p>
                      <button onClick={buyEPart3}>Buy</button>
                      <button onClick={sellEPart3}>Sell</button>
                    </div>
                  </div>
                </div>
                <div id="shield_parts_container">
                  <h4>Shields:</h4>
                  <div className="hull_parts">
                    <div id="hpart1">
                      <div id="carbon_div"></div>
                      <p>{hullParts[0].part_name}</p>
                      <p>+{hullParts[0].hull_strength}%</p>
                      <p>{hullParts[0].cost} c</p>
                      <button onClick={buyHPart1}>Buy</button>
                      <button onClick={sellHPart1}>Sell</button>
                    </div>
                    <div id="hpart2">
                      <div id="graphene_div"></div>
                      <p>{hullParts[1].part_name}</p>
                      <p>+{hullParts[1].hull_strength}%</p>
                      <p>{hullParts[1].cost} c</p>
                      <button onClick={buyHPart2}>Buy</button>
                      <button onClick={sellHPart2}>Sell</button>
                    </div>
                    <div id="hpart3">
                      <div id="neutrino_div"></div>
                      <p>{hullParts[2].part_name}</p>
                      <p>+{hullParts[2].hull_strength}%</p>
                      <p>{hullParts[2].cost} c</p>
                      <button onClick={buyHPart3}>Buy</button>
                      <button onClick={sellHPart3}>Sell</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="statistics">
              <div id="ship_info">
                <h3>
                  <em>{chosenShip.spaceship_name}</em>
                </h3>
                <p>Range: {range} light years</p>
                <p>Shields: {strength}%</p>
                <p>Credits: {credits}</p>
              </div>
              <div id="destination">
                <div id="destination_info">
                  <h3>Destination</h3>
                  <p>System: {selectedSystem.name}</p>
                  <p>Distance: {selectedSystem.distance} light years</p>
                  <p>
                    Mission complexity: {selectedSystem.mission_complexity};
                  </p>
                  <p>60% shields needed</p>
                </div>
                <div id="system_div">
                  <img
                    id="shipyard_misson_img"
                    src={sysImg}
                    alt="selected_system"
                  />
                </div>
              </div>
            </div>
          </div>
          <div id="shipyard_buttons">
            <button onClick={saveShip}>Save ship</button>
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
        </div>
      ) : (
        loadParts()
      )}
    </>
  );
}

export default SigmaShipyard;
