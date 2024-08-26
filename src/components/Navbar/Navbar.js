import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../favicon.ico";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-header">
          <a href="/" className="navbar-brand">
            <img
              src={logo}
              style={{ width: "40px", height: "40px" }}
              alt="Your Brand Logo"
            />
          </a>
        </div>
        <div className="navbar-menu">
          <ul className="navbar-nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tools">Tools</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
