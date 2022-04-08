import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";
import {
  saveSpaceship,
  deleteSpaceship,
  fetchSpaceships,
  fetchPropulsion,
  fetchShields,
} from "./ShipsSlice";
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
  buyNeutron,
  sellNeutron,
} from "./ShipsSlice";
import proxima_centauri from "../../Images/proxima_centauri.jpeg";
import tau_ceti from "../../Images/tau_ceti.jpeg";
import upsilon_andromedae from "../../Images/upsilon_andromedae.jpeg";
import button_click from "../../Sounds/button_click.mp3";
import go_back from "../../Sounds/go_back.mp3";
import ship_saved from "../../Sounds/ship_saved.mp3";
import ship_scrapped from "../../Sounds/ship_scrapped.mp3";

function SigmaShipyard() {
  const navigate = useNavigate();
  const storeState = useSelector((state) => state);
  const dispatch = useDispatch();
  const [buttonSound] = useSound(button_click)
  const [shipSavedSound] = useSound(ship_saved);
  const [shipScrappedSound] = useSound(ship_scrapped, { volume: 0.65 });
  const [goBackSound] = useSound(go_back, { volume: 0.6 });
  const shipCredits = storeState.spaceships.chosenShip.credits;

  let sysImg = "";
  if (storeState.systems.chosenSystem.name === "Proxima Centauri") {
    sysImg = proxima_centauri;
  } else if (storeState.systems.chosenSystem.name === "Tau Ceti") {
    sysImg = tau_ceti;
  } else if (storeState.systems.chosenSystem.name === "Upsilon Andromedae") {
    sysImg = upsilon_andromedae;
  } else sysImg = null;

  function buyEPart1(e) {
    e.preventDefault();
    buttonSound()
    if (shipCredits >= 150000) {
      dispatch(buyNuclear());
    } else {
      window.confirm("You have run out of credits.");
    }
  }

  function sellEPart1(e) {
    e.preventDefault();
    buttonSound()
    if (storeState.spaceships.chosenShip.nuclearCount > 0) {
      dispatch(sellNuclear());
    } else {
      window.confirm("You have no more to sell.");
    }
  }

  function buyEPart2(e) {
    e.preventDefault();
    buttonSound()
    if (shipCredits >= 250000) {
      dispatch(buyFusion());
    } else {
      window.confirm("You have run out of credits.");
    }
  }

  function sellEPart2(e) {
    e.preventDefault();
    buttonSound()
    if (storeState.spaceships.chosenShip.fusionCount > 0) {
      dispatch(sellFusion());
    } else {
      window.confirm("You have no more to sell.");
    }
  }

  function buyEPart3(e) {
    e.preventDefault();
    buttonSound()
    if (shipCredits >= 400000) {
      dispatch(buyAntimatter());
    } else {
      window.confirm("You have run out of credits.");
    }
  }

  function sellEPart3(e) {
    e.preventDefault();
    buttonSound()
    if (storeState.spaceships.chosenShip.antimatterCount > 0) {
      dispatch(sellAntimatter());
    } else {
      window.confirm("You have no more to sell.");
    }
  }

  function buySPart1(e) {
    e.preventDefault();
    buttonSound()
    if (shipCredits >= 20000) {
      dispatch(buyCarbon());
    } else {
      window.confirm("You have run out of credits.");
    }
  }

  function sellSPart1(e) {
    e.preventDefault();
    buttonSound()
    if (storeState.spaceships.chosenShip.carbonCount > 0) {
      dispatch(sellCarbon());
    } else {
      window.confirm("You have no more to sell.");
    }
  }

  function buySPart2(e) {
    e.preventDefault();
    buttonSound()
    if (shipCredits >= 90000) {
      dispatch(buyGraphene());
    } else {
      window.confirm("You have run out of credits.");
    }
  }

  function sellSPart2(e) {
    e.preventDefault();
    buttonSound()
    if (storeState.spaceships.chosenShip.grapheneCount > 0) {
      dispatch(sellGraphene());
    } else {
      window.confirm("You have no more to sell.");
    }
  }

  function buySPart3(e) {
    e.preventDefault();
    buttonSound()
    if (shipCredits >= 300000) {
      dispatch(buyNeutron());
    } else {
      window.confirm("You have run out of credits.");
    }
  }

  function sellSPart3(e) {
    e.preventDefault();
    buttonSound()
    if (storeState.spaceships.chosenShip.neutronCount > 0) {
      dispatch(sellNeutron());
    } else {
      window.confirm("You have no more to sell.");
    }
  }

  function saveShip(e) {
    e.preventDefault();
    dispatch(saveSpaceship(storeState.spaceships.chosenShip));
    dispatch(fetchSpaceships());
    dispatch(fetchPropulsion());
    dispatch(fetchShields());
  }

  function scrapShip(e) {
    e.preventDefault();
    window.confirm(`Would you like to destroy the spaceship ${storeState.spaceships.chosenShip.spaceship_name}?`)
    if (window.confirm) {
      shipScrappedSound();
      dispatch(deleteSpaceship(storeState.spaceships.chosenShip));
      dispatch(fetchSpaceships());
      dispatch(fetchPropulsion());
      dispatch(fetchShields());
      navigate("/ships_overview");
    } 
  }

  return (
    <>
        <div id="shipyard">
          <div>
            <h2>【Ｓｈｉｐｙａｒｄ Ｐａｒｔｓ Ｉｎｖｅｎｔｏｒｙ】</h2>
            <div id="parts">
              <div>
                <h3>【ｓｈｉｅｌｄｓ】</h3>
                <div id="shield_parts">
                  <div id="spart1">
                    <div id="carbon_div"></div>
                    <p className="inside_part">
                      {storeState.spaceships.shields[0].part_name}
                    </p>
                    <p className="inside_part">
                      +{storeState.spaceships.shields[0].hull_strength}%
                    </p>
                    <p className="inside_part">
                      {storeState.spaceships.shields[0].cost} c
                    </p>
                    <button className="part_button" onClick={buySPart1}>
                      Buy
                    </button>
                    <button className="part_button" onClick={sellSPart1}>
                      Sell
                    </button>
                    {storeState.spaceships.chosenShip.carbonCount > 0 ? <div className="parts_count"><em>{storeState.spaceships.chosenShip.carbonCount} installed</em></div> : null}
                  </div>
                  <div id="spart2">
                    <div id="graphene_div"></div>
                    <p className="inside_part">
                      {storeState.spaceships.shields[1].part_name}
                    </p>
                    <p className="inside_part">
                      +{storeState.spaceships.shields[1].hull_strength}%
                    </p>
                    <p className="inside_part">
                      {storeState.spaceships.shields[1].cost} c
                    </p>
                    <button className="part_button" onClick={buySPart2}>
                      Buy
                    </button>
                    <button className="part_button" onClick={sellSPart2}>
                      Sell
                    </button>
                    {storeState.spaceships.chosenShip.grapheneCount > 0 ? <div className="parts_count"><em>{storeState.spaceships.chosenShip.grapheneCount} installed</em></div> : null}
                  </div>
                  <div id="spart3">
                    <div id="neutron_div"></div>
                    <p className="inside_part">
                      {storeState.spaceships.shields[2].part_name}
                    </p>
                    <p className="inside_part">
                      +{storeState.spaceships.shields[2].hull_strength}%
                    </p>
                    <p className="inside_part">
                      {storeState.spaceships.shields[2].cost} c
                    </p>
                    <button className="part_button" onClick={buySPart3}>
                      Buy
                    </button>
                    <button className="part_button" onClick={sellSPart3}>
                      Sell
                    </button>
                    {storeState.spaceships.chosenShip.neutronCount > 0 ? <div className="parts_count"><em>{storeState.spaceships.chosenShip.neutronCount} installed</em></div> : null}
                  </div>
                </div>
              </div>
              <div>
                <h3>【ｐｒｏｐｕｌｓｉｏｎ】</h3>
                <div id="engine_parts">
                  <div id="epart1">
                    <div id="nuclear_div"></div>
                    <p className="inside_part">
                      {storeState.spaceships.propulsion[0].part_name}
                    </p>
                    <p className="inside_part">
                      {storeState.spaceships.propulsion[0].range} ly
                    </p>
                    <p className="inside_part">
                      {storeState.spaceships.propulsion[0].cost} c
                    </p>
                    <button className="part_button" onClick={buyEPart1}>
                      Buy
                    </button>
                    <button className="part_button" onClick={sellEPart1}>
                      Sell
                    </button>
                    {storeState.spaceships.chosenShip.nuclearCount > 0 ? <div className="parts_count"><em>{storeState.spaceships.chosenShip.nuclearCount} installed</em></div> : null}
                  </div>
                  <div id="epart2">
                    <div id="fusion_div"></div>
                    <p className="inside_part">
                      {storeState.spaceships.propulsion[1].part_name}
                    </p>
                    <p className="inside_part">
                      {storeState.spaceships.propulsion[1].range} ly
                    </p>
                    <p className="inside_part">
                      {storeState.spaceships.propulsion[1].cost} c
                    </p>
                    <button className="part_button" onClick={buyEPart2}>
                      Buy
                    </button>
                    <button className="part_button" onClick={sellEPart2}>
                      Sell
                    </button>
                    {storeState.spaceships.chosenShip.fusionCount > 0 ? <div className="parts_count"><em>{storeState.spaceships.chosenShip.fusionCount} installed</em></div> : null}
                  </div>
                  <div id="epart3">
                    <div id="antimatter_div"></div>
                    <p className="inside_part">
                      {storeState.spaceships.propulsion[2].part_name}
                    </p>
                    <p className="inside_part">
                      {storeState.spaceships.propulsion[2].range} ly
                    </p>
                    <p className="inside_part">
                      {storeState.spaceships.propulsion[2].cost} c
                    </p>
                    <button className="part_button" onClick={buyEPart3}>
                      Buy
                    </button>
                    <button className="part_button" onClick={sellEPart3}>
                      Sell
                    </button>
                    {storeState.spaceships.chosenShip.antimatterCount > 0 ? <div className="parts_count"><em>{storeState.spaceships.chosenShip.antimatterCount} installed</em></div> : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="statistics">
            <div id="destination">
              <div id="destination_info">
                <h3>Destination</h3>
                <p>System: {storeState.systems.chosenSystem.name}</p>
                <p>
                  Distance: {storeState.systems.chosenSystem.distance} light
                  years
                </p>
                <p>{storeState.systems.chosenSystem.shields_required}% shields needed</p>
              </div>
              <div id="system_div">
                <img
                  id="shipyard_misson_img"
                  src={sysImg}
                  alt="selected_system"
                />
              </div>
            </div>
            <div id="ship_info">
              <h3>
                <em>{storeState.spaceships.chosenShip.spaceship_name}</em>
              </h3>
              <p>Range: {storeState.spaceships.chosenShip.range} light years</p>
              <p>Shields: {storeState.spaceships.chosenShip.strength}%</p>
              <p>Credits: {shipCredits}</p>
              <div id="luminous_ship"></div>
            </div>
          </div>
        </div>
        <div id="shipyard_buttons">
          <button
            className="button_zoom"
            onClick={() => {
              goBackSound();
              dispatch(fetchSpaceships())
              navigate("/ships_overview");
            }}
          >
            Go back
          </button>
          <button
            className="button_zoom"
            onClick={(e) => {
              shipSavedSound();
              saveShip(e);
            }}
          >
            Save ship
          </button>
          <button
            className="button_zoom"
            onClick={(e) => {
              scrapShip(e);
            }}
          >
            Scrap ship
          </button>
        </div>
    </>
  );
}

export default SigmaShipyard;
