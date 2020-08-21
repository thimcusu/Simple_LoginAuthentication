import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({
  component: Component,
  loggedIn = false,
  path = "/",
  ...rest
}) => (
  <Route
    path={path}
    {...rest}
    render={(props) =>
      loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              prevLocation: path,
              error: "You need to login first!",
            },
          }}
        />
      )
    }
  />
);

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
  path: PropTypes.string,
};

export default ProtectedRoute;
