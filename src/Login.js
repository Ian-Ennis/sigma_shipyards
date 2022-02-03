import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setTriSystems }) {
  const [accountExists, setAccountExists] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const navigate = useNavigate();

  function logUserIn(e) {
    e.preventDefault();

    function jwtReceived() {
      if (localStorage.getItem("jwt")) {
        console.log("token present");
        navigate("/main_menu");
      } else console.log("token does not exist");
    }

    const loginData = {
      user: { username: loginUsername, password: loginPassword },
    };

    fetch(`http://localhost:3000/api/v1/login`, {
      method: "POST",
      headers: {
        accepts: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then((json) => localStorage.setItem("jwt", json.jwt))
      .then(jwtReceived());

    setLoginUsername("");
    setLoginPassword("");
  }

  function hideLogin(e) {
    e.preventDefault();
    setAccountExists(false);
  }

  function showLogin(e) {
    e.preventDefault();
    setAccountExists(true);
  }

  function createProfile(e) {
    e.preventDefault();

    fetch(`http://localhost:3000/api/v1/users`, {
      method: "POST",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { username, password } }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("here's the json:", json);
        setAccountExists(true);
      });
  }

  return (
    <>
      {accountExists ? (
        <div className="all_login_containers">
          <form className="login" onSubmit={logUserIn}>
            Username:{" "}
            <input
              className="username"
              type="text"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
              placeholder="Username"
            />
            Password:{" "}
            <input
              className="password"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="Password"
            />
            <button className="login_submit" type="submit">
              Login
            </button>
            <button className="need_account" id="need_account" onClick={hideLogin}>Need an account?</button>
            <button
              className="logout"
              onClick={() => {
                localStorage.setItem("jwt", "");
                navigate("/");
              }}
            >
              Logout
            </button>
          </form>
        </div>
      ) : (
        <div>
          <form className="login" onSubmit={createProfile}>
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
            <button className="login_submit" type="submit">
              Create Profile & Re-enter credentials
            </button>
            <button onClick={showLogin}>Have an account?</button>
            <button
              className="logout"
              onClick={() => {
                localStorage.setItem("jwt", "");
                navigate("/");
              }}
            >
              Logout
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Login;
