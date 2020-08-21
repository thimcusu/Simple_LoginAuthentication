import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import WrapperForm from "../components/common/WrapperForm";
import { postLoginUser, logOut } from "../actions/userAction";
import { getJwt } from "../utils/jwt";

function LoginForm({ history, onLoggedIn }) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUserName = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (getJwt()) {
      dispatch(logOut());
    }
    try {
      await dispatch(postLoginUser({ username, password }));
      onLoggedIn();
      history.push("/");
    } catch (error) {
      alert(error + "\n\bIncorrect password or username!");
    }
  };

  return (
    <WrapperForm>
      <h4>Hello! Let is get started</h4>
      <h6 className="font-weight-light">Sign in to continue.</h6>
      <form className="pt-3" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="username"
            className="form-control form-control-lg"
            placeholder="Username"
            onChange={handleChangeUserName}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control form-control-lg"
            placeholder="Password"
            onChange={handleChangePassword}
            required
          />
        </div>
        <div className="mt-3">
          <button
            type="submit"
            className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
          >
            SIGN IN
          </button>
        </div>
        <div className="my-2 d-flex justify-content-between align-items-center">
          <div className="form-check">
            <label className="form-check-label text-muted">
              <input type="checkbox" className="form-check-input" />
              Keep me signed in
            </label>
          </div>
          <a href="#" className="auth-link text-black">
            Forgot password?
          </a>
        </div>
        <div className="text-center mt-4 font-weight-light">
          Do not have an account?{" "}
          <Link to="/register" className="text-primary">
            Create
          </Link>
        </div>
      </form>
    </WrapperForm>
  );
}

LoginForm.propTypes = {
  history: PropTypes.object,
  onLoggedIn: PropTypes.func,
};

export default LoginForm;
