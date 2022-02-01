import React from "react";
import {useState} from "react";

function Login({ logUserIn }) {
  const [accountExists, setAccountExists] = useState(true);
  console.log(accountExists)

  function logUserIn(e) {
    e.preventDefault();
    console.log("login fetch goes here");
    const usernameInput = e.target.username_field.value;
    const passwordInput = e.target.password_field.value;
    console.log(usernameInput)
    console.log(passwordInput)
  }

  function hideLogin(e) {
      e.preventDefault();
      setAccountExists(false)
  }

  function createProfile(e) {
      e.preventDefault();
      console.log("create account fetch goes here")
      const chosenUsername = e.target.create_username.value;
      const chosenPassword = e.target.create_password.value;
      console.log(chosenUsername)
      console.log(chosenPassword)
  }

  return (
    <div>
      {accountExists ? (
        <div>
          <form className="login" onSubmit={logUserIn}>
            <input type="text" name="username_field" placeholder="Username" />
            <input type="text" name="password_field" placeholder="Password" />
            <button type="submit" >Login</button>
          </form>
          <button onClick={hideLogin}>Need an account?</button>
        </div>
      ) : (
        <form className="create_profile" onSubmit={createProfile}>
            <input type="text" name="create_username" placeholder="Create Username" />
            <input type="text" name="create_password" placeholder="Create Password" />
            <button type="submit" >Create Profile</button>
          </form>
      )}
    </div>
  );
}

export default Login;
