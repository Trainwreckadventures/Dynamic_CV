import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { RootState } from "../store/store";
import "../styles/Navbar.css";
//the navigationbar for all my pages:
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userId } = useSelector((state: RootState) => state.auth);
  //on log out go back to log in page:
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

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
          {userId ? (
            <button onClick={handleLogout} className="link-button">
              LOG OUT
            </button>
          ) : (
            <Link to="/" className="link">
              LOG IN
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
