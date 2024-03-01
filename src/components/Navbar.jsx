import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <nav className="top-nav">
      <div>
        <Link to="/home" className="logo">
          My App
        </Link>
      </div>
      <ul className="nav-list">
        {!user ? (
          <>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/register">Sign up</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/asset-platforms">Asset Platforms</Link>
            </li>
            <li>
              <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            </li>
            <li>
              <Link to="/my-coins">My Coins</Link>
            </li>
            <li>
              <button onClick={logOut} className="logout-btn">
                Logout
              </button>
            </li>
            <h1>Welcome {user && user.userName}</h1>
          </>
        )}
      </ul>
    </nav>
  );
};
