import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setTriSystems }) {
  const [profileExists, setProfileExists] = useState(true);
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  // const [username, setusername] = useState("");
  // const [password, setpassword] = useState("");
  // const [username, setusername] = useState("");
  // const [password, setpassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token){
      fetch(`http://localhost:3000/auto_login`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        // setUser(data)
      })
    }
  }, [])

  function login(e) {
    e.preventDefault();

    function jwtReceived() {
      if (localStorage.getItem("jwt")) {
        console.log("token present");
        navigate("/main_menu");
      } else console.log("token does not exist");
    }

    const loginData = {
      user: { username: username, password: password },
    };

    fetch(`http://localhost:3000/login`, {
      method: "POST",
      headers: {
        accepts: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.jwt)
        console.log(data)
        // navigate("/main_menu")
      // .then(jwtReceived());
      })
    setUsername("");
    setPassword("");
  }

  function hideLogin(e) {
    e.preventDefault();
    setProfileExists(false);
  }

  function showLogin(e) {
    e.preventDefault();
    setProfileExists(true);
  }

  function createProfile(e) {
    e.preventDefault();
    console.log(password)
    fetch(`http://localhost:3000/users`, {
      method: "POST",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { username, password } }),
    })
      .then((res) => res.json())
      .then((data) => {
        // navigate("/main_menu")
        localStorage.setItem("token", data.jwt)
        console.log(data)
        // setProfileExists(true);
      });
      setUsername("")
      setPassword("")
  }

  return (
    <>
      {profileExists ? (
        <div className="all_login_containers">
          <form className="login" onSubmit={login}>
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
            <div className="login_create_have_logout">
              <button className="login_submit" type="submit">
                Login
              </button>
              <button
                className="need_account"
                id="need_account"
                onClick={hideLogin}
              >
                Need an account?
              </button>
              <div id="logout">
                <button
                  className="logout"
                  onClick={() => {
                    localStorage.setItem("jwt", "");
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <form className="login" onSubmit={createProfile}>
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
            <div className="login_create_have_logout">
              <button className="login_submit" type="submit">
                Create Profile & Re-enter credentials
              </button>
              <button onClick={showLogin}>Have an account?</button>
              <div id="logout">
                <button
                  className="logout"
                  onClick={() => {
                    localStorage.setItem("jwt", "");
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Login;
