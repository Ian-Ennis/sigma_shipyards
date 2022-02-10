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
        is choose a system, and build a suitable ship to reach it. Will you
        be the one to save humanity? ..Do you even have a choice...?{" "}
      </p>
      <button onClick={goToShipsMenu}>
        <span>
        BOARD SHUTTLE TO SHIPYARD
        </span>
      </button>
      <button
        id="main_menu_logout"
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
