import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="title">Dynamic CV Portal</h1>
      <ul className="navList">
        <li>
          <Link to="/dashboard" className="link">
            DASHBOARD
          </Link>
        </li>
        <li>
          <Link to="/create-cv" className="link">
            CREATE CV
          </Link>
        </li>
        <li>
          <Link to="/cv-list" className="link">
            CVs
          </Link>
        </li>
        <li>
          <Link to="/user-list" className="link">
            USERs
          </Link>
        </li>
        <li>
          <Link to="/" className="link">
            LOG IN
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
