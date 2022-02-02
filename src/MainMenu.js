import React from "react";
import { useNavigate } from "react-router-dom";

function MainMenu() {
  const navigate = useNavigate();

  function shuttleToShipyard() {
    navigate("/MissionDebrief");
  }

  function navigateToLogin() {
    navigate("/");
  }

  return (
    <div>
      <p>
        It's the year 2089, and things really aren't looking good. Scientists
        have discovered the sun is readying to release an insurvivable solar
        flare! Humanity's last hope to continue onwards is by reaching other
        star systems with habitable planets. Private companies are creating
        their own orbital shipyards left and right, and one in particular, Sigma
        Shipyards, has asked me to lead construction of their fleet. They have
        three star systems selected already. All I have to do is build a
        suitable ship and try to reach one of the systems. Will I be the one to
        save humanity?.. Do I even have a choice...?{" "}
      </p>
      <button onClick={shuttleToShipyard}>
        Attempt to Save Humanity (board suborbital shuttle to shipyard)
      </button>
      <button onClick={navigateToLogin}>Decline... (Logout)</button>
    </div>
  );
}

export default MainMenu;
