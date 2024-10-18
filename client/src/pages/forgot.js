import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
    axios.defaults.withCredentials = true;

  const [email, setemail] = useState("");
  const navigate = useNavigate();
  const HandleSubmit =  (e) => {
    e.preventDefault()
      axios.post(`${process.env.REACT_APP_BACKEND_URI}/forgot`, { email }).then(res=> {
        if(res.data.status){
          alert("Check Your Email for reset Password");
          navigate("/login");
        }
      }).catch(err => {
        console.log(err)
      })
    };
  return (
    <div>
      <div className="login-container">
        <h2>Forgot Password</h2>
        <form id="login-form" onSubmit={HandleSubmit}>
          
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={(e) => setemail(e.target.value)}
            />
            <span id="username-error" className="error"></span>
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Forgot;
