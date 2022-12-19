import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSound from "use-sound";
import main_menu from "../Sounds/main_menu.mp3";

function LoginForm({ setCurrentUser, profileExists, setProfileExists  }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [triggerMenuSound] = useSound(main_menu);
  const navigate = useNavigate();

  function hideLogin(e) {
    e.preventDefault();
    navigate("/signup")
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function login(e) {
    e.preventDefault();
    const userCreds = { ...formData };

    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCreds),
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          console.log("data:", data)
          localStorage.setItem("token", data.jwt);
          localStorage.setItem("current user", data.user.username)
          localStorage.setItem("current user id", data.user.id)
          setCurrentUser(data.user)
          setFormData({
            username: "",
            password: "",
          });
          navigate("/main_menu");
        });
      } else {
        response.json().then((err) => {
          console.log("login response is bad")
          console.log(err);
        });
      }
    });
  }

  return (
    <div id="login_background">
      <div className="all_login_containers">
        <form
          id="login"
          onSubmit={(e) => {
            login(e);
            triggerMenuSound();
          }}
        >
          <div className="username_password">
            Username:{" "}
            <input
              className="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
            />
            Password:{" "}
            <input
              className="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
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
    </div>
  );
}

export default LoginForm;
