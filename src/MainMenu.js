import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetShips } from "./features/ships/ShipsSlice";
import useSound from "use-sound";
import board_shuttle from "./Sounds/board_shuttle.mp3";
import logout from "./Sounds/logout.mp3";

function MainMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [boardShuttleSound] = useSound(board_shuttle, { volume: 0.75 });
  const [logoutSound] = useSound(logout);

  return (
    <div id="intro_div">
      <div id="stories">
        <p className="intro_story">Welcome, {localStorage.getItem("current user")}..</p>
        <p className="intro_story">
          It&lsquo;s the year 2089. The earth is no longer habitable, as the atmosphere
          has become too toxic to support life. The last hope for humanity to survive is by
          reaching distant star systems with potentially-habitable planets.
        </p>{" "}
        <p className="intro_story">
          Private companies are creating their own orbital shipyards left and
          right. One in particular, Sigma Shipyards, has recognized your
          abilities, and asked you to lead construction of their fleet. They have three star systems
          selected already. All you have to do is choose one of the systems, and
          build a suitable ship. Few people have been given this opportunity. Will you
          be the one to help save humanity?
        </p>
      </div>
      <button
        onClick={() => {
          boardShuttleSound();
          navigate("/misson_select");
        }}
      >
        <span>Board shuttle to orbital shipyard</span>
      </button>
      <button
        id="main_menu_logout"
        onClick={() => {
          logoutSound();
          dispatch(resetShips())
          localStorage.clear()
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default MainMenu;
