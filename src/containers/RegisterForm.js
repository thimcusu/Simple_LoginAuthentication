import React, { useState } from "react";
import WrapperForm from "../components/common/WrapperForm";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { AVATAR_URL_DEFAULT } from "../constants/userConstant";
import { postUser } from "../actions/userAction";
import PropTypes from "prop-types";

function RegisterForm({ history }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [check, setCheck] = useState(false);

  const handleChangeFirstName = (event) => {
    setFirstname(event.target.value);
  };

  const handleChangeLastName = (event) => {
    setLastname(event.target.value);
  };

  const handleChangeUserName = (event) => {
    setUsername(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleCheck = () => {
    setCheck(!check);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = {
      first_name: firstname,
      last_name: lastname,
      email,
      avatarUrl: AVATAR_URL_DEFAULT,
      username,
      password,
    };
    try {
      await dispatch(postUser(newUser));
      history.push("/login");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <WrapperForm>
      <h4>New here?</h4>
      <h6 className="font-weight-light">
        Signing up is easy. It only takes a few steps
      </h6>
      <form className="pt-3 needs-validation" onSubmit={handleSubmit}>
        <div className="row">
          <div className="form-group col-lg-6">
            <input
              type="text"
              name="firstname"
              className="form-control form-control-lg"
              placeholder="First Name"
              onChange={handleChangeFirstName}
              required
            />
          </div>
          <div className="form-group col-lg-6">
            <input
              type="text"
              name="lastname"
              className="form-control form-control-lg"
              placeholder="Username"
              onChange={handleChangeLastName}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="username"
            className="form-control form-control-lg"
            placeholder="Username"
            onChange={handleChangeUserName}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            className="form-control form-control-lg"
            placeholder="Email"
            onChange={handleChangeEmail}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            className="form-control form-control-lg"
            placeholder="Password"
            onChange={handleChangePassword}
            required
          />
        </div>
        <div className="mb-4">
          <div className="form-check">
            <label className="form-check-label text-muted">
              <input
                type="checkbox"
                className="form-check-input"
                onChange={handleCheck}
              />
              I agree to all Terms & Conditions
            </label>
          </div>
        </div>
        <div className="mt-3">
          <button
            disabled={check ? false : true}
            type="submit"
            className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
          >
            SIGN UP
          </button>
        </div>
        <div className="text-center mt-4 font-weight-light">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </div>
      </form>
    </WrapperForm>
  );
}

RegisterForm.propTypes = {
  history: PropTypes.object,
};

export default RegisterForm;
