import React from "react";
import PropTypes from "prop-types";

import logo from "../../images/logo.png";
import "./WrapperForm.css";

function WrapperForm({ children }) {
  return (
    <div className="container-fluid">
      <div className="content-wrapper d-flex align-items-center px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="form-light text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img src={logo} width="40" height="40" alt="logo" />
                <h3>Test Est Rouge</h3>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

WrapperForm.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};
export default WrapperForm;
