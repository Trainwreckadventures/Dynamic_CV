import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="title">CV MAKER</h1>
      <ul className="navList">
        <li>
          <Link to="/dashboard" className="link">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/cv-list" className="link">
            CV List
          </Link>
        </li>
        <li>
          <Link to="/create-cv" className="link">
            Create CV
          </Link>
        </li>
        <li>
          <Link to="/" className="link">
            Log in
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
