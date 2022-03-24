import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div>
    <h3 className="title">Rent A Superhero!</h3>
    {isLoggedIn ? (
      <div>
        {/* The navbar will show these links after you log in */}
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <div className="container-fluid">
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
            <div
              className="collapse navbar-collapse"
              id="navbarNav"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/superheroes">
                    All Superheroes
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={handleClick}>
                    Logout
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/cart">
                    Cart
                  </a>
                </li>
                {isAdmin ? (
                  <li className="nav-item">
                    <a className="nav-link" href="/users">
                      View Users
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    ) : (
      <div>
        {/* The navbar will show these links before you log in */}

        <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <div className="container-fluid">
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
            <div
              className="collapse navbar-collapse"
              id="navbarNav"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/superheroes">
                    All Superheroes
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Log In
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/signup">
                    Sign Up
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/cart">
                    Cart
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )}
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.administrator,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
