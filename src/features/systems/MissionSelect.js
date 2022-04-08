import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSystems, chooseSystem, resetSystems } from "./MissionSlice";
import proxima_centauri from "../../Images/proxima_centauri.jpeg";
import tau_ceti from "../../Images/tau_ceti.jpeg";
import upsilon_andromedae from "../../Images/upsilon_andromedae.jpeg";
import useSound from "use-sound";
import button_click from "../../Sounds/button_click.mp3";
import mission_selection from "../../Sounds/mission_selection.mp3";
import go_back from "../../Sounds/go_back.mp3";

function MissionSelect() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeState = useSelector((state) => state);
  const [buttonSound] = useSound(button_click);
  const [missionSound] = useSound(mission_selection)
  const [goBackSound] = useSound(go_back, { volume: 0.6 });

  let eachSystem = [];
  if (storeState.systems.entities.length) {
    storeState.systems.entities.forEach((system) => {
      eachSystem.push(system);
    });
  }

  return (
    <>
      {eachSystem.length ? (
        <div className="mission_div">
          <h2 id="mission_select">
            【ｃｈｏｏｓｅ ｙｏｕｒ ｄｅｓｔｉｎａｔｉｏｎ】
          </h2>
          <div id="mission_container">
            <div id="proxima">
              <p>
                System:{" "}
                <b>
                  <em>{eachSystem[0].name}</em>
                </b>
              </p>
              <img
                id="img_proxima"
                src={proxima_centauri}
                alt="proxima_centauri"
              />
              <p>
                Distance: <b>{eachSystem[0].distance} light years</b>
              </p>
              <p>
                Mission complexity: <b>{eachSystem[0].mission_complexity}</b>
              </p>
              <p>
                Odds of finding habitable planet:{" "}
                <b>{eachSystem[0].habitibility_chance}%</b>
              </p>
              <button
                onClick={() => {
                  buttonSound();
                  dispatch(chooseSystem(eachSystem[0]));
                  navigate("/ships_overview");
                }}
              >
                <span>Choose system</span>
              </button>
            </div>
            <div id="tau">
              <p>
                System:{" "}
                <b>
                  <em>{eachSystem[1].name}</em>
                </b>
              </p>
              <img id="img_tau_ceti" src={tau_ceti} alt="tau_ceti" />
              <p>
                Distance: <b>{eachSystem[1].distance} light years</b>
              </p>
              <p>
                Mission complexity: <b>{eachSystem[1].mission_complexity}</b>
              </p>
              <p>
                Odds of finding habitable planet:{" "}
                <b>{eachSystem[1].habitibility_chance}%</b>
              </p>
              <button
                onClick={() => {
                  buttonSound();
                  dispatch(chooseSystem(eachSystem[1]));
                  navigate("/ships_overview");
                }}
              >
                {" "}
                <span>Choose system</span>
              </button>
            </div>
            <div id="upsilon">
              <p>
                System:{" "}
                <b>
                  <em>{eachSystem[2].name}</em>
                </b>
              </p>
              <img
                id="img_upsilon"
                src={upsilon_andromedae}
                alt="upsilon_andromedae"
              />
              <p>
                Distance: <b>{eachSystem[2].distance} light years</b>
              </p>
              <p>
                Mission complexity: <b>{eachSystem[2].mission_complexity}</b>
              </p>
              <p>
                Odds of finding habitable planet:{" "}
                <b>{eachSystem[2].habitibility_chance}%</b>
              </p>
              <button
                onClick={() => {
                  buttonSound();
                  dispatch(chooseSystem(eachSystem[2]));
                  navigate("/ships_overview");
                }}
              >
                <span>Choose system</span>
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              dispatch(resetSystems())
              goBackSound();
              navigate("/main_menu");
            }}
          >
            Go back
          </button>
        </div>
      ) : (
        <div className="mission_div">
          <p id="shuttle_systems">
            On the shuttle, a display of missions corresponding to different
            star systems presents itself..
          </p>
          <button onClick={() => {
            buttonSound()
            missionSound()
            dispatch(fetchSystems())
          }
            }><span>View star systems</span></button>
        </div>
      )}
    </>
  );
}

export default MissionSelect;
