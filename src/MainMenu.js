import React from "react";
import { useNavigate } from "react-router-dom";

function MainMenu() {
  const navigate = useNavigate();

  function goToShipsMenu() {
    navigate("/misson_select");
  }

  return (
    <div className="intro_div">
      <p className="intro_story">
        It's the year 2089. Scientists have discovered the sun is readying to
        release an insurvivable solar flare. Humanity's last hope to continue
        onwards is by reaching distant star systems with potentially-habitable
        planets.
      </p>{" "}
      <p className="intro_story">
        Private companies are creating their own orbital shipyards left and
        right. One in particular, Sigma Shipyards, has recognized your abilities
        and asked{" "}
        <em>
          <b>you</b>
        </em>{" "}
        to lead construction of their fleet. They have three star systems
        selected already. All you have to do is choose one of the systems, and
        build a suitable ship to reach it. In exchange, you will be given a
        ticket to board. Few people have been given this opportunity. Will you
        be the one to help save humanity?
      </p>
      <p className="intro_story">Do you even have a choice...?</p>{" "}
      <button onClick={goToShipsMenu}>
        <span>Board shuttle to orbital shipyard</span>
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
