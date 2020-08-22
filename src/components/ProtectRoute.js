import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import useFetchCurrentUser from "../api/useFetchCurrentUser";

const ProtectedRoute = ({ component: Component, path = "/", ...rest }) => {
  const { currentUser } = useFetchCurrentUser();
  const loggedIn = JSON.stringify(currentUser) === "{}" ? false : true;
  return (
    <Route
      path={path}
      {...rest}
      render={(props) =>
        loggedIn ? (
          <Component {...props} currentUser={currentUser} loggedIn={loggedIn} />
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
};

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
  path: PropTypes.string,
};

export default ProtectedRoute;
