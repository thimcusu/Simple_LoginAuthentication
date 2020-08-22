import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import useFetchUsers from "../api/useFetchUsers";
import { logOut } from "../actions/userAction";
import UserTable from "../containers/UserTable";
import Header from "./Header";

function HomePage({ history, currentUser, loggedIn }) {
  const dispatch = useDispatch();
  const { users, apiCallStatus: callApiUserStatus } = useFetchUsers();
  const isLoading = callApiUserStatus !== 0;

  const handleLogOut = () => {
    dispatch(logOut());
    history.push("/login");
  };
  return (
    <>
      {loggedIn ? (
        <div className="app">
          <Header currentUser={currentUser.user} onLogOut={handleLogOut} />
          <div className="container-fluid table-wrapper">
            <UserTable users={users} isLoading={isLoading}></UserTable>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <div className="spinner-border m-5" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}

HomePage.propTypes = {
  history: PropTypes.object,
  currentUser: PropTypes.object,
  loggedIn: PropTypes.bool,
};

export default HomePage;
