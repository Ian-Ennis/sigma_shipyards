import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpaceships, fetchPropulsion, fetchShields, chooseShip, newShip } from "./ShipsSlice";
import proxima_centauri from "../../Images/proxima_centauri.jpeg";
import tau_ceti from "../../Images/tau_ceti.jpeg";
import upsilon_andromedae from "../../Images/upsilon_andromedae.jpeg";

function ShipsOverview() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeState = useSelector((state) => state); /* redux state*/

  const systemName = storeState.systems.chosenSystem.name
  const systemDistance = storeState.systems.chosenSystem.distance
  const system_complexity = storeState.systems.chosenSystem.mission_complexity
  const system_habitability = storeState.systems.chosenSystem.habitibility_chance


  function getShips() {
    dispatch(fetchSpaceships())
    dispatch(fetchPropulsion())
    dispatch(fetchShields())
  }

  function selectShip(e, ship) {
    e.preventDefault();
    dispatch(chooseShip(ship));
    navigate("/sigma_shipyard");
  }

  function createShip(e) {
    e.preventDefault();
    const ship = e.target.ship_name.value
    dispatch(newShip(ship))
  }

  function goBack() {
    navigate("/misson_select");
  }

  const eachShip = [];

  if (storeState.spaceships.spaceships.length) {
    storeState.spaceships.spaceships.forEach((ship) => {
      eachShip.push(ship);
    });
  }

  let sysImg = "";
  if (storeState.systems.chosenSystem.name === "Proxima Centauri") {
    sysImg = proxima_centauri;
  } else if (storeState.systems.chosenSystem.name === "Tau Ceti") {
    sysImg = tau_ceti;
  } else {
    sysImg = upsilon_andromedae;
  }

  return (
    <div id="intro_to_shipyard">
      <p id="approach_terminal">
        Your shuttle has docked with the shipyard. You make your way toward the
        viewport overlooking Sigma Shipyard's fleet, and you notice the nearby shipyard computer
        terminal. Thoughts of self-doubt swirl in your head, accompanied by
        intrigue over what lies ahead... Yet, you suddenly sense a fleeting glimmer
        of confidence in your ship-making abilities, and you reach out and grasp
        it as you step forth to the terminal...
      </p>
      <div id="ships_with_img">
        <div id="system_by_missions">
          <p>
            System:{" "}
            <b>
              <em>{systemName}</em>
            </b>
          </p>
          <img id="system_misson_img" src={sysImg} alt="selected_system" />
          <p>
            Distance: <b>{systemDistance} light years</b>
          </p>
          <p>
            Mission complexity: <b>{system_complexity}</b>
          </p>
          <p>
            Chance of finding habitable planet:{" "}
            <b>{system_habitability}%</b>
          </p>
        </div>
        <div className="all_options">
          <div className="ships_in_db">
            <h3>View current ships..</h3>
            {eachShip.length
              ? eachShip.map((ship) => (
                  <div key={ship.id}>
                    <p>{ship.spaceship_name}</p>
                    <button onClick={(e) => selectShip(e, ship)}>
                      <span>Select ship</span>
                    </button>
                  </div>
                ))
              : null}
            <button onClick={getShips}>Access shipyard data</button>
          </div>
          <div id="add_new_ship">
            <h3>Or,&#10;create a new ship</h3>
            <form className="createShip" onSubmit={createShip}>
              <label for="ship_name">Name your ship:</label>
              <input
                id="new_ship_input"
                type="text"
                name="ship_name"
                placeholder=""
              />
              <button type="submit">
                <span>Create ship</span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <button id="back_to_mission_select" onClick={goBack}>Back to mission select</button>
    </div>
  );
}

export default ShipsOverview;
