import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { store } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpaceships } from "./ShipsOverviewSlice"
import proxima_centauri from "../../Images/proxima_centauri.jpeg";
import tau_ceti from "../../Images/tau_ceti.jpeg";
import upsilon_andromedae from "../../Images/upsilon_andromedae.jpeg";

function ShipsOverview({ selectedSystem, setSelectedSystem, setChosenShip }) {
  const [allShips, setAllShips] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const state = useSelector((state) => state);

  function getShips() {
    // console.log('in get ships')
    // dispatch(fetchSpaceships())

    fetch(`http://localhost:3000/spaceships`, {
        method: "GET",
        headers: {
            Accepts: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setAllShips(data);
      });
  }
  
  function selectShip(e, ship) {
    e.preventDefault();
    console.log(ship);
    setChosenShip(ship);
    navigate("/sigma_shipyard");
  }
  
  function createShip(e) {
    e.preventDefault();
    const spaceship_name = e.target.ship_name.value;
    
    fetch(`http://localhost:3000/spaceships`, {
      method: "POST",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        spaceship_name,
      }),
    }).then(() => {
      fetch(`http://localhost:3000/spaceships`, {
        method: "GET",
        headers: {
          Accepts: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setChosenShip(data[data.length - 1]);
        setAllShips(data);
      });
    });
  }
  
  function goBack() {
    setSelectedSystem([]);
    navigate("/misson_select");
  }
  
  const eachShip = [];
  
  // change this to use storestate.spaceships (if (storestate.length))
  if (allShips.length) {
    allShips.forEach((ship) => {
      eachShip.push(ship);
    });
  }
  
  let sysImg = "";
  if (selectedSystem.name === "Proxima Centauri") {
    sysImg = proxima_centauri;
  } else if (selectedSystem.name === "Tau Ceti") {
    sysImg = tau_ceti;
  } else {
    sysImg = upsilon_andromedae;
  }

  return (
    <div id="intro_to_shipyard">
      <p id="approach_terminal">
        Thoughts of self-doubt, but intrigue over what lies ahead... Yet
        somehow, you sense a fleeting glimmer of confidence in your ship-making
        abilities, as you step forth to the shipyard computer terminal...
      </p>
      <div id="ships_with_img">
        <div id="system_by_missions">
          <p>
            System:{" "}
            <b>
              <em>{selectedSystem.name}</em>
            </b>
          </p>
          <img id="system_misson_img" src={sysImg} alt="selected_system" />
          <p>
            Distance: <b>{selectedSystem.distance} light years</b>
          </p>
          <p>
            Mission complexity: <b>{selectedSystem.mission_complexity}</b>
          </p>
          <p>
            Chance of finding habitable planet:{" "}
            <b>{selectedSystem.habitibility_chance}%</b>
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
      <button onClick={goBack}>Back to mission select</button>
    </div>
  );
}

export default ShipsOverview;
