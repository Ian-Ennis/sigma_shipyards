import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function signUp(e) {
    e.preventDefault();
    const userCreds = { ...formData };

    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCreds),
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          localStorage.setItem("token", data.jwt);
          setFormData({
            username: "",
            password: "",
          });
          navigate("/");
        });
      } else {
        response.json().then((err) => {
          console.log("login response is bad")
          console.log(err);
        });
      }
    });
  }

  function showLogin(e) {
    e.preventDefault();
    navigate("/");
  }

  return (
    <div id="login_background">
      <div className="all_login_containers">
          <form
            className="login"
            onSubmit={(e) => {
              signUp(e);
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
                placeholder="Create Username"
              />
              Password:{" "}
              <input
                className="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
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
    </div>
  );
}

export default SignupForm;
