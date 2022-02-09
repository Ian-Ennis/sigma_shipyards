import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { buyNuclear, sellNuclear, buyFusion, sellFusion, buyAntimatter, sellAntimatter, buyCarbon, sellCarbon, buyGraphene, sellGraphene, buyNeutrino, sellNeutrino} from "./CreditsSlice"
import { installNuclear, removeNuclear, installFusion, removeFusion, installAntimatter, removeAntimatter} from "./RangeSlice"
import { installCarbon, removeCarbon, installGraphene, removeGraphene, installNeutrino, removeNeutrino} from "./StrengthSlice"
import { useDispatch } from "react-redux"
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

  const storeState = useSelector(state => state)
  console.log(storeState)

  const budget = storeState.credits.balance
  const range = storeState.range.distance
  const nuclearCount = storeState.range.nuclearCount
  const fusionCount = storeState.range.fusionCount
  const antimatterCount = storeState.range.antimatterCount
  const hullStrength = storeState.strength.hull
  const carbonCount = storeState.strength.carbonCount
  const grapheneCount = storeState.strength.grapheneCount
  const neutrinoCount = storeState.strength.neutrinoCount


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

  function buyEPart1(e) {
    e.preventDefault();
    if (budget >= 150000) {
      dispatch(buyNuclear()) 
      dispatch(installNuclear())
      console.log(budget, nuclearCount, range)
    } else {
      window.confirm("You have run out of credits. Sell parts to increase your budget.");
    }
  }

  function sellEPart1(e) {
    e.preventDefault();
    if (nuclearCount > 0) {
      dispatch(sellNuclear())
      dispatch(removeNuclear())
      console.log(budget, nuclearCount, range)
    } else {
      window.confirm("You have no more to sell.");
    }
  }

  function buyEPart2(e) {
    e.preventDefault();
    if (budget >= 250000) {
      dispatch(buyFusion())
      dispatch(installFusion())
      console.log(budget, fusionCount, range)
    } else {
      window.confirm("You have run out of credits. Sell parts to increase your budget.");
    }
  }

  function sellEPart2(e) {
    e.preventDefault();
    if (fusionCount > 0) {
      dispatch(sellFusion())
      dispatch(removeFusion())
      console.log(budget, fusionCount, range)
    } else {
      window.confirm("You have no more to sell.");
    }
  }

  function buyEPart3(e) {
    e.preventDefault();
    if (budget >= 400000) {
      dispatch(buyAntimatter())
      dispatch(installAntimatter())
      console.log(budget, antimatterCount, range)
    } else {
      window.confirm("You have run out of credits. Sell parts to increase your budget.");
    }
  }

  function sellEPart3(e) {
    e.preventDefault();
    if (antimatterCount > 0) {
      dispatch(sellAntimatter())
      dispatch(removeAntimatter())
      console.log(budget, antimatterCount, range)
    } else {
      window.confirm("You have no more to sell.");
    }
  }

  function buyHPart1(e) {
    e.preventDefault();
    if (budget >= 20000) {
      dispatch(buyCarbon())
      dispatch(installCarbon())
      console.log(budget, carbonCount, range)
    } else {
      window.confirm("You have run out of credits. Sell parts to increase your budget.");
    }
  }

  function sellHPart1(e) {
    e.preventDefault();
    if (carbonCount > 0) {
      dispatch(sellCarbon())
      dispatch(removeCarbon())
      console.log(budget, carbonCount, range)
    } else {
      window.confirm("You have no more to sell.");
    }
  }

  function buyHPart2(e) {
    e.preventDefault();
    if (budget >= 90000) {
    dispatch(buyGraphene())
    dispatch(installGraphene())
    console.log(budget, grapheneCount, range)
    } else {
      window.confirm("You have run out of credits. Sell parts to increase your budget.");
    }
  }

  function sellHPart2(e) {
    e.preventDefault();
    if (grapheneCount > 0) {
    dispatch(sellGraphene())
    dispatch(removeGraphene())
    console.log(budget, grapheneCount, range)
    } else {
      window.confirm("You have no more to sell.");
    }
  }

  function buyHPart3(e) {
    e.preventDefault();
    if (budget >= 300000) {
      dispatch(buyNeutrino())
      dispatch(installNeutrino())
      console.log(budget, neutrinoCount, range)
    } else {
      console.log("You have run out of credits. Sell parts to increase your budget.");
    }
  }

  function sellHPart3(e) {
    e.preventDefault();
    if (neutrinoCount > 0) {
    dispatch(sellNeutrino())
    dispatch(removeNeutrino())
    console.log(budget, neutrinoCount, range)
    } else {
      window.confirm("You have no more to sell.");
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
              <p>Credits: {budget}</p>
              <h3><em>{chosenShip.spaceship_name}</em> Statistics</h3>
              <p>Fuel tank range: {range} light years</p>
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
                  <button onClick={sellEPart2}>Sell</button>
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
                  <button onClick={sellEPart3}>Sell</button>
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
                  <button onClick={sellHPart1}>Sell</button>
                </div>
                <div id="hpart2">
                  <img className="part" src={graphene_weave} alt="part" />
                  <p>{hullParts[1].part_name}</p>
                  <p>+{hullParts[1].hull_strength}%</p>
                  <p>{hullParts[1].cost} c</p>
                  <button onClick={buyHPart2}>Buy</button>
                  <button onClick={sellHPart2}>Sell</button>
                </div>
                <div id="hpart3">
                  <img className="part" src={neutrino_repulsor} alt="part" />
                  <p>{hullParts[2].part_name}</p>
                  <p>+{hullParts[2].hull_strength}%</p>
                  <p>{hullParts[2].cost} c</p>
                  <button onClick={buyHPart3}>Buy</button>
                  <button onClick={sellHPart3}>Sell</button>
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