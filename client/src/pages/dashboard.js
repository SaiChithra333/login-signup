import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URI}/auth/verify`).then((res) => {
      if (res.data.status) {
      } else {
        alert('cant access ,please login')
        navigate("/");
      }
    });
  }, []);
  return <div className="text-center"><p className="text-center mt-4 fs-3 fst-italic">Dashboard</p></div>;
};

export default Dashboard;
