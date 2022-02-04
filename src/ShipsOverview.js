import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ShipsOverview({ setSelectedSystem, setChosenShip }) {
  const [allShips, setAllShips] = useState([]);
  // const [shipsVisible, setShipsVisible] = useState(false)
  const navigate = useNavigate();


  function getShips() {
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
        setAllShips(data);
      });
  }

  function selectShip(e, ship) {
      e.preventDefault()
      setChosenShip(ship)
      navigate("/sigma_shipyard")
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
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setChosenShip(data);
      });
  }

  function goBack() {
    setSelectedSystem([])
    navigate("/misson_select")
  }

  const eachShip = []

  if (allShips.length) {
    allShips.forEach((ship) => {
      eachShip.push(ship);
    });
  }

  return (
    <div id="intro_to_shipyard">
      <p id="approach_terminal">
        Thoughts of self-doubt, but intrigue over what lies ahead... Yet
        somehow, you sense a fleeting glimmer of confidence in your ship-making
        abilities, as you step forth to the shipyard computer terminal...
      </p>
      <div>
        {eachShip.length
          ? eachShip.map((ship) => (
              <div key={ship.id}>
                <p>{ship.spaceship_name}</p>
                <button onClick={(ship) => selectShip(ship)}>Select ship</button>
              </div>
            ))
          : null}
        <button onClick={getShips}>Access shipyard data</button>
      </div>
      <div>
        <h4>Make a new ship</h4>
        <form className="createShip" onSubmit={createShip}>
          <label for="ship_name">Name of your ship:</label>
          <input type="text" name="ship_name" placeholder="" />
          <button type="submit">Create a spaceship</button>
        </form>
        <button onClick={goBack}>Back to mission select</button>
      </div>
    </div>
  );
}

export default ShipsOverview;
