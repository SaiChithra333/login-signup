import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";
import "../clgphoto.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  axios.defaults.withCredentials = true;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URI}/signup`, {
        username,
        email,
        password,
      })
      .then((res) => {
        const { message } = res.data;
        if (message === "User created successfully") {
          alert("Registered successfully");
          navigate("/login");
        } else {
          alert("User already exists,please login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  useEffect(() => {
    const usernameError = document.getElementById("username-error");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    
    usernameError.innerText =""
    emailError.innerText = ""
    passwordError.innerText = ""
    if (username.length < 4) {
      usernameError.innerText = "Username must be at least 4 characters";
    } else if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      usernameError.innerText = "Username can only contain letters, numbers, underscores, and hyphens";
    } else {
      usernameError.innerText = "";
    }

    if (email.length < 6 || !/\S+@\S+\.\S+/.test(email)) {
      emailError.innerText = "Please enter a valid email address";
    }  else {
      emailError.innerText = "";
    }

    if (password.length < 6) {
      passwordError.innerText = "Password must be at least 6 characters";
    } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password)) {
      passwordError.innerText = "Password must contain at least one special character";
    } else {
      passwordError.innerText = "";
    }
  },[username,email,password]); 

  return (
    <div className="mainbox">
      <div className="login-container">
        <h2>SignUp</h2>
        <form id="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span id="username-error" className="error"></span>
          </div>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span id="email-error" className="error"></span>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span id="password-error" className="error"></span>
          </div>
          <button type="submit">SignUp</button>
          <p>
            Already Have an Account ? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
