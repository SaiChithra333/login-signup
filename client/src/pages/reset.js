import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate, useParams } from "react-router-dom";

const Reset = () => {
 axios.defaults.withCredentials = true;
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const {token} = useParams()
  const HandleSubmit =  (e) => {
    e.preventDefault()
      axios.post(`${process.env.REACT_APP_BACKEND_URI}/reset/${token}`, { password }).then(res=> {
        if(res.data.status){
          navigate("/login");
        }
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
    };
  return (
    <div>
      <div className="login-container">
        <h2>Reset Password</h2>
        <form id="login-form" onSubmit={HandleSubmit}>
          
          <div className="input-group">
            <label htmlFor="password">password:</label>
            <input
              type="text"
              id="password"
              name="password"
              onChange={(e) => setpassword(e.target.value)}
            />
            <span id="username-error" className="error"></span>
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Reset;
