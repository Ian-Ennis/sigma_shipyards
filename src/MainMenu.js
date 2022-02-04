import React from "react";
import { useNavigate } from "react-router-dom";

function MainMenu() {
  const navigate = useNavigate();

  function goToShipsMenu() {
    navigate("/misson_select");
  }

  return (
    <div className="intro_div">
      <p id="intro_story">
        It's the year 2089, and things really aren't looking good. Scientists
        have discovered the sun is readying to release an insurvivable solar
        flare! Humanity's last hope to continue onwards is by reaching distant
        star systems with potentially-habitable planets. Private companies are
        creating their own orbital shipyards left and right, and one in
        particular, Sigma Shipyards, has asked you to lead construction of their
        fleet. They have three star systems selected already. All you have to do
        is build a suitable ship and try to reach one of the systems. Will you
        be the one to save humanity? ..Do you even have a choice...?{" "}
      </p>
      <button onClick={goToShipsMenu}>
        Board shuttle to Sigma Shipyards
      </button>
      <button
        id="logout"
        onClick={() => {
          localStorage.setItem("jwt", "");
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default MainMenu;
