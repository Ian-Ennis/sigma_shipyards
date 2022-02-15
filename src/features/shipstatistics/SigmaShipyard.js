import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buyNuclear, sellNuclear, buyFusion, sellFusion, buyAntimatter, sellAntimatter, buyCarbon, sellCarbon, buyGraphene, sellGraphene, buyNeutrino, sellNeutrino, resetCredits, installNuclear, removeNuclear, installFusion, removeFusion, installAntimatter, removeAntimatter, resetRange, installCarbon, removeCarbon, installGraphene, removeGraphene, installNeutrino, removeNeutrino, resetStrength} from "../ships/ShipsSlice"
import { useDispatch, useSelector } from "react-redux";
import proxima_centauri from "../../Images/proxima_centauri.jpeg";
import tau_ceti from "../../Images/tau_ceti.jpeg";
import upsilon_andromedae from "../../Images/upsilon_andromedae.jpeg";

function SigmaShipyard({ selectedSystem, chosenShip, setChosenShip }) {
  const [viewport, setViewport] = useState(false);
  const [engineParts, setEngineParts] = useState([]);
  const [hullParts, setHullParts] = useState([]);

  const navigate = useNavigate();
  const storeState = useSelector((state) => state);
  const dispatch = useDispatch();

  const shipName = storeState.spaceships.chosenShip.spaceship_name;
  const shipCredits = storeState.spaceships.chosenShip.credits;
  const shipRange = storeState.spaceships.chosenShip.range;
  const shipShields = storeState.spaceships.chosenShip.strength;
  const nuclearCount = storeState.spaceships.chosenShip.nuclearCount;
  const fusionCount = storeState.spaceships.chosenShip.fusionCount;
  const antimatterCount = storeState.spaceships.chosenShip.antimatterCount;
  const carbonCount = storeState.spaceships.chosenShip.carbonCount;
  const grapheneCount = storeState.spaceships.chosenShip.grapheneCount;
  const neutrinoCount = storeState.spaceships.chosenShip.neutrinoCount;


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
    if (shipCredits >= 150000) {
      dispatch(buyNuclear());
      dispatch(installNuclear());
    } else {
      window.confirm("You have run out of credits.");
    }
  }

  function sellEPart1(e) {
    e.preventDefault();
    if (nuclearCount > 0) {
      dispatch(sellNuclear());
      dispatch(removeNuclear());
    } else {
      window.confirm("You have no more to sell.");
    }
  }

  function buyEPart2(e) {
    e.preventDefault();
    if (shipCredits >= 250000) {
      dispatch(buyFusion());
      dispatch(installFusion());
    } else {
      window.confirm("You have run out of credits.");
    }
  }

  function sellEPart2(e) {
    e.preventDefault();
    if (fusionCount > 0) {
      dispatch(sellFusion());
      dispatch(removeFusion());
    } else {
      window.confirm("You have no more to sell.");
    }
  }

  function buyEPart3(e) {
    e.preventDefault();
    if (shipCredits >= 400000) {
      dispatch(buyAntimatter());
      dispatch(installAntimatter());
    } else {
      window.confirm("You have run out of credits.");
    }
  }

  function sellEPart3(e) {
    e.preventDefault();
    if (antimatterCount > 0) {
      dispatch(sellAntimatter());
      dispatch(removeAntimatter());
    } else {
      window.confirm("You have no more to sell.");
    }
  }

  function buySPart1(e) {
    e.preventDefault();
    if (shipCredits >= 20000) {
      dispatch(buyCarbon());
      dispatch(installCarbon());
    } else {
      window.confirm("You have run out of credits.");
    }
  }

  function sellSPart1(e) {
    e.preventDefault();
    if (carbonCount > 0) {
      dispatch(sellCarbon());
      dispatch(removeCarbon());
    } else {
      window.confirm("You have no more to sell.");
    }
  }

  function buySPart2(e) {
    e.preventDefault();
    if (shipCredits >= 90000) {
      dispatch(buyGraphene());
      dispatch(installGraphene());
    } else {
      window.confirm("You have run out of credits.");
    }
  }

  function sellSPart2(e) {
    e.preventDefault();
    if (grapheneCount > 0) {
      dispatch(sellGraphene());
      dispatch(removeGraphene());
    } else {
      window.confirm("You have no more to sell.");
    }
  }

  function buySPart3(e) {
    e.preventDefault();
    if (shipCredits >= 300000) {
      dispatch(buyNeutrino());
      dispatch(installNeutrino());
    } else {
      window.confirm("You have run out of credits.");
    }
  }

  function sellSPart3(e) {
    e.preventDefault();
    if (neutrinoCount > 0) {
      dispatch(sellNeutrino());
      dispatch(removeNeutrino());
    } else {
      window.confirm("You have no more to sell.");
    }
  }

  function saveShip() {
    console.log(chosenShip.id);

    // fetch(`http://localhost:3000/spaceships/${chosenShip.id}`, {
    //   method: "PATCH",
    //   headers: {
    //     Accepts: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    //   },
    //   body: JSON.stringify({
    //     spaceship_name,
    //     credits,
    //     range,
    //     strength,
    //     nuclearCount,
    //     fusionCount,
    //     antimatterCount,
    //     carbonCount,
    //     grapheneCount,
    //     neutrinoCount,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
        // console.log(storeState)
      // });
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
        }
      });
      navigate("/ships_overview");
    }
  }

  function goBack() {
    // dispatch(resetCredits());
    // dispatch(resetRange());
    // dispatch(resetStrength());
    navigate("/ships_overview");
  }

  return (
    <>
      {viewport ? (
        <div className="whole_shipyard">
          <div className="shipyard">
            <div className="stats_parts_container">
              <h2>【﻿Ｓｈｉｐｙａｒｄ　Ｐａｒｔｓ　Ｉｎｖｅｎｔｏｒｙ】</h2>
              <div className="parts">
                <div id="shield_parts_container">
                  <h3>【﻿ｓｈｉｅｌｄｓ】</h3>
                  <div className="shield_parts">
                    <div id="spart1">
                      <div id="carbon_div"></div>
                      <p className="inside_part">{hullParts[0].part_name}</p>
                      <p className="inside_part">
                        +{hullParts[0].hull_strength}%
                      </p>
                      <p className="inside_part">{hullParts[0].cost} c</p>
                      <button className="part_button" onClick={buySPart1}>
                        Buy
                      </button>
                      <button className="part_button" onClick={sellSPart1}>
                        Sell
                      </button>
                    </div>
                    <div id="spart2">
                      <div id="graphene_div"></div>
                      <p className="inside_part">{hullParts[1].part_name}</p>
                      <p className="inside_part">
                        +{hullParts[1].hull_strength}%
                      </p>
                      <p className="inside_part">{hullParts[1].cost} c</p>
                      <button className="part_button" onClick={buySPart2}>
                        Buy
                      </button>
                      <button className="part_button" onClick={sellSPart2}>
                        Sell
                      </button>
                    </div>
                    <div id="spart3">
                      <div id="neutrino_div"></div>
                      <p className="inside_part">{hullParts[2].part_name}</p>
                      <p className="inside_part">
                        +{hullParts[2].hull_strength}%
                      </p>
                      <p className="inside_part">{hullParts[2].cost} c</p>
                      <button className="part_button" onClick={buySPart3}>
                        Buy
                      </button>
                      <button className="part_button" onClick={sellSPart3}>
                        Sell
                      </button>
                    </div>
                  </div>
                </div>
                <div id="engine_parts_container">
                  <h3>【﻿ｐｒｏｐｕｌｓｉｏｎ】</h3>
                  <div className="engine_parts">
                    <div id="epart1">
                      <div id="nuclear_div"></div>
                      <p className="inside_part">{engineParts[0].part_name}</p>
                      <p className="inside_part">{engineParts[0].range} ly</p>
                      <p className="inside_part">{engineParts[0].cost} c</p>
                      <button className="part_button" onClick={buyEPart1}>
                        Buy
                      </button>
                      <button className="part_button" onClick={sellEPart1}>
                        Sell
                      </button>
                    </div>
                    <div id="epart2">
                      <div id="fusion_div"></div>
                      <p className="inside_part">{engineParts[1].part_name}</p>
                      <p className="inside_part">{engineParts[1].range} ly</p>
                      <p className="inside_part">{engineParts[1].cost} c</p>
                      <button className="part_button" onClick={buyEPart2}>
                        Buy
                      </button>
                      <button className="part_button" onClick={sellEPart2}>
                        Sell
                      </button>
                    </div>
                    <div id="epart3">
                      <div id="antimatter_div"></div>
                      <p className="inside_part">{engineParts[2].part_name}</p>
                      <p className="inside_part">{engineParts[2].range} ly</p>
                      <p className="inside_part">{engineParts[2].cost} c</p>
                      <button className="part_button" onClick={buyEPart3}>
                        Buy
                      </button>
                      <button className="part_button" onClick={sellEPart3}>
                        Sell
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="statistics">
              <div id="ship_info">
                <h3>
                  <em>{shipName}</em>
                </h3>
                <p>Range: {shipRange} light years</p>
                <p>Shields: {shipShields}%</p>
                <p>Credits: {shipCredits}</p>
                <div id="luminous_ship"></div>
              </div>
              <div id="destination">
                <div id="destination_info">
                  <h3>Destination</h3>
                  <p>System: {storeState.systems.chosenSystem.name}</p>
                  <p>Distance: {storeState.systems.chosenSystem.distance} light years</p>
                  <p>
                    Mission complexity: {storeState.systems.chosenSystem.mission_complexity};
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
            <button className="button_zoom" onClick={goBack}>
              Go back
            </button>
            <button className="button_zoom" onClick={saveShip}>
              Save ship
            </button>
            <button className="button_zoom" onClick={scrapShip}>
              Scrap ship
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
