import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSound from "use-sound";
import main_menu from "./Sounds/main_menu.mp3";

function Login() {
  const [profileExists, setProfileExists] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [triggerMenuSound] = useSound(main_menu);

  function login(e) {
    e.preventDefault();

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          localStorage.setItem("token", data.token);
          setUsername("");
          setPassword("");
          navigate("/main_menu");
        });
      } else {
        r.json().then((err) => {
          console.log(err);
        });
      }
    });
  }

  function createProfile(e) {
    e.preventDefault();

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          localStorage.setItem("token", data.include[0].jwt);
          setUsername("");
          setPassword("");
          navigate("/main_menu");
        });
      } else {
        r.json().then((err) => {
          console.log(err);
        });
      }
    });
  }

  function hideLogin(e) {
    e.preventDefault();
    setProfileExists(false);
  }

  function showLogin(e) {
    e.preventDefault();
    setProfileExists(true);
  }

  return (
    <div id="login_background">
      {profileExists ? (
        <div className="all_login_containers">
          <form
            id="login"
            onSubmit={(e) => {
              triggerMenuSound();
              login(e);
            }}
          >
            <div className="username_password">
              Username:{" "}
              <input
                className="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
              Password:{" "}
              <input
                className="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <div className="login_create">
              <button className="login_submit" type="submit">
                <span>Login</span>
              </button>
              <button id="need_account" onClick={hideLogin}>
                <span>New registration</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="all_login_containers">
          <form
            className="login"
            onSubmit={(e) => {
              triggerMenuSound();
              createProfile(e);
            }}
          >
            <div className="username_password">
              Username:{" "}
              <input
                className="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Create Username"
              />
              Password:{" "}
              <input
                className="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create Password"
              />
            </div>
            <div className="login_create">
              <button className="login_submit" type="submit">
                <span>Register</span>
              </button>
              <button onClick={showLogin}>
                <span>Already registered?</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
