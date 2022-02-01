import React from "react";
import { useState } from "react";

function Login({ logUserIn }) {
  const [accountExists, setAccountExists] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [loggedInUsername, setLoggedInUsername] = useState('')

  function logUserIn(e) {
    e.preventDefault();
    console.log("login fetch goes here");
    const loginData = {
        user: {username: loginUsername, password: loginPassword}
    }

    fetch(`http://localhost:3000/api/v1/login`, {
        method: 'POST', 
        headers: {
            accepts: 'application/json',
            'Content-type':'application/json',
        },
        body: JSON.stringify(loginData),
    })
    .then((res) => res.json())
    .then((json) => localStorage.setItem('jwt', json.jwt));
    setLoginUsername('');
    setLoginPassword('');
    }



  function hideLogin(e) {
    e.preventDefault();
    setAccountExists(false);
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
      .then((json) => console.log("backend connection", json));
      setUsername('')
      setPassword('')
  }

  return (
    <div>
      {accountExists ? (
        <div>
          <form className="login" onSubmit={logUserIn}>
            Username:{" "}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            Password:{" "}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button type="submit">Login</button>
          </form>
          <button onClick={hideLogin}>Need an account?</button>
        </div>
      ) : (
        <form className="create_profile" onSubmit={createProfile}>
          <input
            type="text"
            name="create_username"
            placeholder="Create Username"
          />
          <input
            type="text"
            name="create_password"
            placeholder="Create Password"
          />
          <button type="submit">Create Profile</button>
        </form>
      )}
    </div>
  );
}

export default Login;
