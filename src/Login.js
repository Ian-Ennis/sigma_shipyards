import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [accountExists, setAccountExists] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();


  function logUserIn(e) {
    e.preventDefault();

    function jwtReceived() {
        navigate("/main_menu");
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

    // {localStorage.getItem("jwt") ? console.log('token exists') : console.log('token not found')}
  }

  function hideLogin(e) {
    e.preventDefault();
    setAccountExists(false);
  }

  function createProfile(e) {
    e.preventDefault();
    console.log("inside createProfile");

    function jwtReceived() {
        navigate("/main_menu");
    }

    fetch(`http://localhost:3000/api/v1/users`, {
      method: "POST",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { username, password } }),
    })
      .then((res) => res.json())
      .then((json) => console.log("here's the json:", json))
      .then(jwtReceived());

    setUsername("");
    setPassword("");
  }

  return (
    <div>
      {accountExists ? (
        <div>
          <form className="login" onSubmit={logUserIn}>
            Username:{" "}
            <input
              type="text"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
              placeholder="Username"
            />
            Password:{" "}
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="Password"
            />
            <button type="submit">Login</button>
          </form>
          <button onClick={hideLogin}>Need an account?</button>
        </div>
      ) : (
        <form className="create_profile" onSubmit={createProfile}>
          Username:{" "}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Create Username"
          />
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create Password"
          />
          <button type="submit">Create Profile</button>
        </form>
      )}
    </div>
  );
}

export default Login;
