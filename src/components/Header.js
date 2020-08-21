import React from "react";
import PropTypes from "prop-types";

import logo from "../images/logo.png";
import { AVATAR_URL_DEFAULT } from "../constants/userConstant";

function Header({ currentUser, onLogOut }) {
  return (
    <nav className="navbar bg-dark navbar-expand-sm">
      <a className="navbar-brand" href="#">
        <img src={logo} width="30" height="30" alt="logo" />
        Test Est Rouge
      </a>
      <div className="navbar-collapse justify-content-end">
        <button
          type="button"
          className="logout btn btn-primary btn-sm"
          onClick={onLogOut}
        >
          Log out
        </button>
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a className="nav-link" role="button">
              <img
                src={currentUser ? currentUser.avatarUrl : AVATAR_URL_DEFAULT}
                width="40"
                height="40"
                className="rounded-circle"
              />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

Header.propTypes = {
  currentUser: PropTypes.object,
  onLogOut: PropTypes.func.isRequired,
};

export default Header;
