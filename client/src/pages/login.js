import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";
import "../clgphoto.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  axios.defaults.withCredentials = true;

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [autherror, setautherror] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    
    emailError.innerText = ""
    passwordError.innerText = ""
   

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
  },[email,password]); 

  const HandleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URI}/login`, {
        email,
        password,
      })
      .then((res) => {
        if (res.data.status) {
          navigate('/')
        }
        else{
        setautherror("Invalid email or password")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <div className="mainbox" >
    <div className="login-container">
        <h2>Login</h2>
        <form id="login-form" onSubmit={HandleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              placeholder="example@gmail.com"
              name="email"
              onChange={(e) => setemail(e.target.value)}
            />
            <span id="email-error" className="error"></span>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setpassword(e.target.value)}
            />
            <span id="password-error" className="error"></span>
          </div>
          <button type="submit">Login</button><br/>
      <span id="auth-error" className="error">{autherror}</span><br/><br/>
          <Link to="/forgot" id="forgot">forgot password</Link>
          <p>
            Don't Have an Account ? <Link to="/signup">SignUp</Link>
          </p>
        </form>
      </div>
      </div>   
  );
};

export default Login;
