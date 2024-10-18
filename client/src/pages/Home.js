import React, { useState, useEffect } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [name, setUsername] = useState("None");
  const [email, setUseremail] = useState("None");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    getUser();
    getemail();
  }, []);

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URI}/auth/logout`)
      .then((res) => {
        if (res.data.status) {
          setLoggedIn(false);
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  const getUser = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URI}/username`)
      .then((res) => {
        if (res.data.status) {
          setUsername(res.data.username);
          setLoggedIn(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const getemail = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URI}/email`)
      .then((res) => {
        if (res.data.status) {
          setUseremail(res.data.email);
          setLoggedIn(true);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Outpass Management
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {loggedIn ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/apply-outpass">
                      Apply for Outpass
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/outpass-history">
                      Outpass History
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-outline-light ms-2" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-5">
        {loggedIn ? (
          <div className="d-flex justify-content-center flex-column align-items-center">
            <p className="text-center mt-4 fs-3 fst-italic">
              User {name} is logged in
            </p>
            <div className="card p-3 mb-3 bg-success text-light rounded">
              <p className="h5">👤 Name: {name}</p>
              <p className="h5">📧 Email: {email}</p>
            </div>
            <button className="btn btn-primary">
              <Link
                to="/dashboard"
                className="text-light text-decoration-none"
              >
                Dashboard
              </Link>
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="fs-4">Please login to manage your outpasses</p>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
